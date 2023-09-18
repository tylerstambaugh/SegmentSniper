using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities.Auth;
using System.Text;

namespace SegmentSniper.Api.Configuration
{
    public static class WebApplicationBuilderConfig
    {

        public static WebApplicationBuilder ConfigureBuilder(IConfiguration configuration)
        {
            //var thumbPrint = configuration["CertificateThumbprint"];

            var builder = WebApplication.CreateBuilder();

            var connectionString = builder.Configuration.GetConnectionString("SegmentSniper");

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
               .AddEntityFrameworkStores<SegmentSniperDbContext>();

            IIdentityServerBuilder serverBuilder = builder.Services.AddIdentityServer();

            serverBuilder.ConfigureIdentityServer(configuration, builder.Environment);

            builder.Services.AddAuthorization(options =>
            {
                options.AddPolicy("RequireAdministratorRole",
                     policy => policy.RequireRole("Administrator"));
            });


            builder.Services.AddAuthentication("Bearer")
                .AddIdentityServerJwt().AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
                    };
                });

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    corsBuilder =>
                    {
                        //builder.Configuration["AllowedOrigins"]
                        corsBuilder.WithOrigins("https://localhost:6767")
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });

            builder.Services.AddControllers();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "SegmentSniper.React/dist";
            });

            builder.Services.AddAutoMapper(typeof(Program));

            //register services:
            builder.Services.AddScoped<ISegmentSniperDbContext>(provider => provider.GetService<SegmentSniperDbContext>());

            ServiceRegistrations.RegisterServices(builder.Services);

            return builder;
        }
    }
}
