using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SegmentSniper.Api.ActionHandlers.AuthActionHandlers;
using SegmentSniper.Api.ActionHandlers.LoginActionHandlers;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities;
using SegmentSniper.Services.AuthServices;
using System.Text;

namespace SegmentSniper.Api.Helpers
{
    public static class WebApplicationBuilderConfig
    {

        public static WebApplicationBuilder ConfigureBuilder(IConfiguration configuration)
        {
            var thumbPrint = configuration["CertificateThumbprint"];

            var builder = WebApplication.CreateBuilder();

            var connectionString = builder.Configuration.GetConnectionString("SegmentSniper");

            builder.Services.AddDbContext<SegmentSniperDbContext>(options =>
                    options.UseSqlServer(connectionString));

            builder.Services.AddDatabaseDeveloperPageExceptionFilter();

            builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = true)
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

            builder.Services.AddControllers();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            //register services:

            builder.Services.AddScoped<ISegmentSniperDbContext>(provider => provider.GetService<SegmentSniperDbContext>());


            //action handlers
            builder.Services.AddScoped<IAuthenticateUserActionHandler, AuthenticateUserActionHandler>();
            builder.Services.AddScoped<IRegisterUserActionHandler, RegisterUserActionHandler>();

            //services
            builder.Services.AddScoped<IAuthenticateUser, AuthenticateUser>();
            builder.Services.AddScoped<IRegisterUser, RegisterUser>();
            return builder;
        }


    }



}
