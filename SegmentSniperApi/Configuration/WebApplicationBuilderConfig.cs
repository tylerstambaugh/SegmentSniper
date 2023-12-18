using Azure.Identity;
//using Microsoft.AspNetCore.Authentication;
using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities.Auth;
using System.Net;
using System.Text;
using System.Text.Json;

namespace SegmentSniper.Api.Configuration
{
    public static class WebApplicationBuilderConfig
    {
        public async static Task<WebApplicationBuilder> ConfigureBuilder(IConfiguration configuration)
        {
           // var thumbPrint = configuration["CertificateThumbprint"];

            var builder = WebApplication.CreateBuilder();

            var connectionString = "";

            if (builder.Environment.IsDevelopment())
            {
                var secretsFilePath = Path.Combine(builder.Environment.ContentRootPath, "Secrets.json");
                builder.Configuration.SetBasePath(builder.Environment.ContentRootPath).AddJsonFile(secretsFilePath, optional: true);
                builder.Services.AddApplicationInsightsTelemetry(builder.Configuration["APPLICATIONINSIGHTS_CONNECTION_STRING"]);

                connectionString = builder.Configuration["SegmentSniperConnectionStringDev"];
            }

            if (!builder.Environment.IsDevelopment())
            {
                var keyVaultEndpoint = new Uri(configuration["AzureKeyVault:BaseUrl"] ?? "https://kv-segmentsiper-dev.vault.azure.net/");
                builder.Configuration.AddAzureKeyVault(keyVaultEndpoint, new DefaultAzureCredential());

                builder.Services.AddApplicationInsightsTelemetry(builder.Configuration["APPLICATIONINSIGHTS_CONNECTION_STRING"]);
                
                connectionString = builder.Configuration["SegmentSniperConnectionString"];
            }

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

            builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
                {
                    options.SignIn.RequireConfirmedAccount = true;

                    options.Password.RequireDigit = true;
                    options.Password.RequireLowercase = true;
                    options.Password.RequireNonAlphanumeric = true;
                    options.Password.RequireUppercase = true;
                    options.Password.RequiredLength = 6;
                    options.Password.RequiredUniqueChars = 1;
                }
            )
               .AddRoles<IdentityRole>()
               .AddDefaultTokenProviders()
               .AddEntityFrameworkStores<SegmentSniperDbContext>();

            IIdentityServerBuilder serverBuilder = builder.Services.AddIdentityServer();

            serverBuilder.ConfigureIdentityServer(configuration, builder.Environment);

            builder.Services.AddAuthorization();

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
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["Jwt-Key"]))
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

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    corsBuilder =>
                    {
                        corsBuilder.WithOrigins("https://localhost:6767", "https://localhost:6768", "https://127.0.0.1:6767", "https://127.0.0.1:6768")
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

            builder.Services.AddAutoMapper(typeof(Program));

            builder.Services.AddScoped<ISegmentSniperDbContext>(provider => provider.GetService<SegmentSniperDbContext>());

            ServiceRegistrations.RegisterServices(builder.Services);

            return builder;
        }
    }
}
