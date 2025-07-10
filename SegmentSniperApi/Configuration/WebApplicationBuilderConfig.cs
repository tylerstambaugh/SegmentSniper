using AutoMapper;
using Azure.Identity;
using Duende.IdentityServer.EntityFramework.Options;
using GraphQL;
using GraphQL.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SegmentSniper.Api.Configuration.MappingProfiles;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities.Auth;
using SegmentSniper.GraphQL;
using Serilog;
using Serilog.Sinks.MSSqlServer;
using System.Net;
using System.Reflection;
using System.Text;
using System.Text.Json;

namespace SegmentSniper.Api.Configuration
{
    public static class WebApplicationBuilderConfig
    {
        public static WebApplicationBuilder ConfigureBuilder(IConfiguration configuration)
        {
            // var thumbPrint = configuration["CertificateThumbprint"];

            var builder = WebApplication.CreateBuilder();

            var connectionString = "";
            var jwtKey = builder.Configuration["Jwt-Key"];

            if (jwtKey == null)
                throw new ApplicationException("Unable to load JWT Ket");

            // Setup configuration sources
            //This is being done in program.cs
            //builder.Configuration
            //    .SetBasePath(builder.Environment.ContentRootPath)
            //    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            //    .AddUserSecrets(Assembly.GetExecutingAssembly(), true)
            //    .AddEnvironmentVariables();

            var isDevelopment = builder.Environment.IsDevelopment();

            if (isDevelopment)
            {
                var secretsFilePath = Path.Combine(builder.Environment.ContentRootPath, "secrets.json");
                builder.Configuration.AddJsonFile(secretsFilePath, optional: true);
            }
            else
            {
                var keyVaultEndpoint = builder.Configuration["AzureKeyVault:BaseUrl"];
                if(!string.IsNullOrEmpty(keyVaultEndpoint))
                builder.Configuration.AddAzureKeyVault(new Uri(keyVaultEndpoint), new DefaultAzureCredential());
            }

            builder.Services.AddApplicationInsightsTelemetry();

            // Connection string
            connectionString = builder.Configuration[
                isDevelopment ? "SegmentSniperConnectionStringDev" : "SegmentSniperConnectionString"
            ];


            builder.Services.AddDbContext<SegmentSniperDbContext>(options =>
                    options.UseSqlServer(connectionString));

            builder.Services.Configure<OperationalStoreOptions>(options =>
            {
                options.ConfigureDbContext = builder =>
                    builder.UseSqlServer(connectionString,
                                         sql => sql.MigrationsAssembly("SegmentSniper.Data"));

                // Token cleanup interval (default is 1 hour)
                options.TokenCleanupInterval = 3600; // in seconds, e.g., 1 hour

                // Tokens to be cleaned
                options.TokenCleanupBatchSize = 100; // number of tokens to be cleaned in each batch

                // Automatic token cleanup (default is true)
                options.EnableTokenCleanup = true;
            });


            builder.Services.AddDatabaseDeveloperPageExceptionFilter();

            #region Logging

            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(configuration)
                .Enrich.FromLogContext()
                .WriteTo.MSSqlServer(
                    connectionString: connectionString,
                    sinkOptions: new MSSqlServerSinkOptions { TableName = "SegmentSniperLog", AutoCreateSqlTable = false })
                .MinimumLevel.Debug()
                .CreateLogger();

            builder.Host.UseSerilog();

            #endregion


            #region Identity
            builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
                {
                    options.SignIn.RequireConfirmedAccount = true;

                    options.Password.RequireDigit = true;
                    options.Password.RequireLowercase = true;
                    options.Password.RequireNonAlphanumeric = true;
                    options.Password.RequireUppercase = true;
                    options.Password.RequiredLength = 6;
                    options.Password.RequiredUniqueChars = 1;
                    options.User.RequireUniqueEmail = true;

                    options.Tokens.EmailConfirmationTokenProvider = TokenOptions.DefaultEmailProvider;
                }
            )
               .AddRoles<IdentityRole>()
               .AddDefaultTokenProviders()
               .AddEntityFrameworkStores<SegmentSniperDbContext>();

            builder.Services.Configure<DataProtectionTokenProviderOptions>(options =>
            {
                options.TokenLifespan = TimeSpan.FromHours(24);
            });

            IIdentityServerBuilder serverBuilder = builder.Services.AddIdentityServer();

            serverBuilder.ConfigureIdentityServer(configuration, builder.Environment);

            builder.Services.AddAuthorization(options =>
            {
                options.AddPolicy("AdminPolicy", _ => _.RequireClaim("role", "Admin"));
                options.AddPolicy("UserPolicy", _ => _.RequireAuthenticatedUser());
            });
            

            builder.Services.AddMemoryCache();

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })

                .AddJwtBearer(options =>
                {
                    options.IncludeErrorDetails = true;
                    options.RequireHttpsMetadata = false;

                    options.SaveToken = true;
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtKey))
                    };
                    options.Events = new JwtBearerEvents
                    {
                        OnChallenge = context =>
                        {
                            // Customize the response for unauthorized requests
                            context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                            context.Response.ContentType = "application/json";

                            var result = JsonSerializer.Serialize(new
                            {
                                error = "Unauthorized",
                                description = "You are not authorized to access this resource."
                            });

                            return context.Response.WriteAsync(result);
                        }
                    };
                    options.Events = new JwtBearerEvents
                    {
                        OnForbidden = context =>
                        {
                            // Customize the response for unauthorized requests
                            context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                            context.Response.ContentType = "application/json";

                            var result = JsonSerializer.Serialize(new
                            {
                                error = "Unauthorized",
                                description = "You are not authorized to access this resource."
                            });

                            return context.Response.WriteAsync(result);
                        }
                    };
                });
            #endregion

            #region GraphQl

            builder.Services.AddGraphQL(options =>
            {
                options.AddErrorInfoProvider(o => o.ExposeExceptionDetails = builder.Environment.IsDevelopment());
                options.AddSchema<GraphQlSchema>();
                options.AddGraphTypes(typeof(GraphQlSchema).Assembly);
                options.AddDataLoader();
                options.AddSystemTextJson();
                options.AddAuthorization(options =>
                {
                    options.AddPolicy("AdminPolicy", _ => _.RequireClaim("role", "Admin"));
                    options.AddPolicy("UserPolicy", _ => _.RequireAuthenticatedUser());
                });


                //options.AddErrorInfoProvider(errorInfoProvider =>
                //{
                //    errorInfoProvider.ExposeExceptionDetails = builder.Environment.IsDevelopment(); // Expose details in development

                //    // Customize error information based on specific error types
                //    errorInfoProvider.UseCustomErrors(error =>
                //    {
                //        if (error is ExecutionError)
                //        {
                //            // Modify the error message or add additional information
                //            error.Message = "A custom error message";
                //            error.Extensions.Add("customField", "customValue");
                //        }

                //        return error;
                //    });
                //});

                //options.AddErrorInfoProvider(opt =>
                //{
                //    opt.ExposeExceptionDetails = builder.Environment.IsDevelopment();
                //    opt.(err =>
                //    {
                //        if (err is AuthorizationError)
                //        {
                //            return new ExecutionError("You are not authorized to perform this action.");
                //        }
                //        return err;
                //    });
                //});


            }
             );

            #endregion

            #region API
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    corsBuilder =>
                    {
                        corsBuilder.WithOrigins(
                            "https://localhost:6767", "https://localhost:6768",
                            "https://127.0.0.1:6767", "https://127.0.0.1:6768",
                            "http://localhost:6767", "http://localhost:6768",
                            "http://127.0.0.1:6767", "http://127.0.0.1:6768")
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });

            builder.Services.AddControllers();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();

            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Segment Sniper Pro", Version = "v1" });

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n
                      Enter 'Bearer' [space] and then your token in the text input below.
                      \r\n\r\nExample: 'Bearer 12345abcdef'",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header
            },
            new List<string>()
        }
    });
            });

            builder.Services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "SegmentSniper.React/dist";
            });

            #endregion

            var mapperConfig = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MappingProfile>();
            });

            IMapper mapper = mapperConfig.CreateMapper();


            builder.Services.AddSingleton(mapperConfig); 
            builder.Services.AddSingleton<IMapper>(mapper);


            builder.Services.AddScoped<ISegmentSniperDbContext>(provider => provider.GetService<SegmentSniperDbContext>());

            ServiceRegistrations.RegisterServices(builder.Services);


            return builder;
        }

    }

    public class CustomAuthorizationHandler : IExceptionHandler
    {
        public Task<ExecutionError> HandleAsync(ResolveFieldContext context, Exception exception)
        {
            if (exception is UnauthorizedAccessException)
            {
                // Return a custom ExecutionError with your message
                return Task.FromResult(new ExecutionError("You are not authorized to perform this action."));
            }

            // Handle other exceptions as needed
            return Task.FromResult(new ExecutionError("Something bad happened, mmmkay."));
        }

        public ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
