using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities;
using System.Text;

namespace SegmentSniper.Api.Helpers
{
    public class WebApplicationBuilderConfig
    {
        public static WebApplicationBuilder ConfigureBuilder()
        {
            var builder = WebApplication.CreateBuilder();


            var authConnectionString = builder.Configuration.GetConnectionString("DefaultConnection");

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

            return builder;
        }
    }
}
