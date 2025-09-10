using Azure.Identity;
using Clerk.Net.DependencyInjection;
using GraphQL;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SegmentSniper.Api.Configuration.MappingProfiles;
using SegmentSniper.Data;
using SegmentSniper.GraphQL;
using Serilog;
using Serilog.Sinks.MSSqlServer;
using System.Security.Claims;


namespace SegmentSniper.Api.Configuration
{
    public static class WebApplicationBuilderConfig
    {
        public static WebApplicationBuilder ConfigureBuilder(IConfiguration configuration)
        {

            var builder = WebApplication.CreateBuilder();

            var isDevelopment = builder.Environment.IsDevelopment();
            string environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development";

            if (isDevelopment)
            {
                var secretsFilePath = Path.Combine(builder.Environment.ContentRootPath, "secrets.json");
                builder.Configuration.AddJsonFile(secretsFilePath, optional: true)
                     .AddJsonFile($"appsettings.{environment}.json", optional: false);
            }
            else
            {
                builder.Configuration.AddJsonFile($"appsettings.{environment}.json", optional: false);

                var keyVaultEndpoint = builder.Configuration["AzureKeyVault:BaseUrl"];
                if (!string.IsNullOrEmpty(keyVaultEndpoint))
                    builder.Configuration.AddAzureKeyVault(new Uri(keyVaultEndpoint), new DefaultAzureCredential());
            }

            var connectionString = builder.Configuration.GetConnectionString("SegmentSniperConnectionString");

            builder.Services.AddApplicationInsightsTelemetry();

            builder.Services.AddDbContext<SegmentSniperDbContext>(options =>
                    options.UseSqlServer(connectionString,
                            b => b.MigrationsAssembly("SegmentSniper.Data"))
);

            builder.Services.AddScoped<ISegmentSniperDbContext>(provider => provider.GetService<SegmentSniperDbContext>());

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

            #region Clerk          
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                var jwtSettings = builder.Configuration.GetSection("Jwt");

                options.Authority = jwtSettings["Issuer"];
                options.Audience = jwtSettings["Audience"];

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = jwtSettings["Issuer"],
                    ValidateAudience = true,
                    ValidAudience = jwtSettings["Audience"],
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    RoleClaimType = "roles"
                };

                options.Events = new JwtBearerEvents
                {
                    OnTokenValidated = context =>
                    {
                        var claimsIdentity = context.Principal.Identity as ClaimsIdentity;
                        var roles = claimsIdentity?.FindFirst("roles")?.Value;

                        if (!string.IsNullOrEmpty(roles))
                        {
                            // roles might come as JSON array string -> parse
                            var roleList = System.Text.Json.JsonSerializer.Deserialize<string[]>(roles);

                            if (roleList != null)
                            {
                                foreach (var role in roleList)
                                {
                                    claimsIdentity?.AddClaim(new Claim(claimsIdentity.RoleClaimType, role));
                                }
                            }
                        }

                        return Task.CompletedTask;
                    },

                    OnAuthenticationFailed = context =>
                    {
                        Console.WriteLine("Authentication failed: " + context.Exception.Message);
                        return Task.CompletedTask;
                    }
                };
            });

            builder.Services.AddAuthorization();

            //add clerkApiClient
            builder.Services.AddClerkApiClient(options =>
            {
                var secretKey = configuration["ClerkSecretKey"];

                if (string.IsNullOrEmpty(secretKey))
                    throw new InvalidOperationException("Clerk SecretKey is not configured.");

                options.SecretKey = secretKey; 
            });

           
            //builder.Services.AddAuthorization(options =>
            //{
            //    options.AddPolicy("AdminOnly", policy =>
            //        policy.RequireClaim("org:role", "admin"));
            //});

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

            builder.Services.AddAutoMapper(cfg =>
            {
                cfg.AddProfile<MappingProfile>();
            });


            builder.Services.AddMemoryCache();

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
