using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SegmentSniper.Api.ActionHandlers.LoginActionHandlers;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities;
using System.Text;

namespace SegmentSniper.Api.Helpers
{
    public static class WebApplicationBuilderConfig
    {
        public static WebApplicationBuilder ConfigureBuilder()
        {
            var builder = WebApplication.CreateBuilder();

            var authConnectionString = builder.Configuration.GetConnectionString("SegmentSniper");

            builder.Services.AddDbContext<SegmentSniperDbContext>(options =>
                    options.UseSqlServer(authConnectionString));

            builder.Services.AddDatabaseDeveloperPageExceptionFilter();

            builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = true)
               .AddRoles<IdentityRole>()
               .AddEntityFrameworkStores<SegmentSniperDbContext>();


            builder.Services.AddAuthorization(options =>
            {
                options.AddPolicy("RequireAdministratorRole",
                     policy => policy.RequireRole("Administrator"));
            });

            builder.Services.AddIdentityServer()
                .AddApiAuthorization<ApplicationUser, SegmentSniperDbContext>();

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

            builder.Services.AddScoped<IAuthenticateActionHandler, AuthenticateActionHandler>();

            return builder;
        }
    }
}
