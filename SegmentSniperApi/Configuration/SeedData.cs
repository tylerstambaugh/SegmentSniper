using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using SegmentSniper.Data.Entities.Auth;
using SegmentSniper.Data;

namespace SegmentSniper.Api.Configuration
{
    public class SeedData
    {
        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            using (var scope = serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetService<SegmentSniperDbContext>();

                string[] roles = new string[] { "Admin", "User", "PremiumUser" };

                foreach (string role in roles)
                {
                    var roleStore = new RoleStore<IdentityRole>(context);

                    if (!context.Roles.Any(r => r.Name == role))
                    {
                        await roleStore.CreateAsync(new IdentityRole(role));
                    }
                }

                var user = new ApplicationUser
                {
                    FirstName = "Tyler",
                    Email = "tyler.stambaugh@icloud.com",
                    NormalizedEmail = "TYLER.STAMBAUGH@ICLOUD.COM",
                    UserName = "tyler.stambaugh@icloud.com",
                    NormalizedUserName = "TYLER.STAMBAUGH@ICLOUD.COM",
                    PhoneNumber = "+111111111111",
                    EmailConfirmed = true,
                    PhoneNumberConfirmed = true,
                    SecurityStamp = Guid.NewGuid().ToString("D")
                };


                if (!context.Users.Any(u => u.UserName == user.UserName))
                {
                    var password = new PasswordHasher<ApplicationUser>();
                    var hashed = password.HashPassword(user, "Password1!");
                    user.PasswordHash = hashed;

                    var userStore = new UserStore<ApplicationUser>(context);
                    var result = userStore.CreateAsync(user);

                }

                AssignRoles(serviceProvider, user.Email, roles);

                await context.SaveChangesAsync();
            }
        }

        public static async Task<IdentityResult> AssignRoles(IServiceProvider services, string email, string[] roles)
        {
            UserManager<ApplicationUser> _userManager = services.GetService<UserManager<ApplicationUser>>();
            ApplicationUser user = await _userManager.FindByEmailAsync(email);
            var result = await _userManager.AddToRolesAsync(user, roles);

            return result;
        }
    }
}
