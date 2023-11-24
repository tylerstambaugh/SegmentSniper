using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities.Auth;

namespace SegmentSniper.Api.Configuration
{
    public class SeedData
    {
        public static async Task Initialize(IServiceProvider serviceProvider, IConfiguration config)
        {
            using (var scope = serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetService<SegmentSniperDbContext>();

                List<string> roles = new List<string> { "Admin", "User", "PremiumUser" };

                foreach (string role in roles)
                {
                    var roleStore = new RoleStore<IdentityRole>(context);

                    if (!context.Roles.Any(r => r.Name == role))
                    {
                        await roleStore.CreateAsync(new IdentityRole
                        {
                            Name = role,
                            NormalizedName = role.ToUpper(),
                            ConcurrencyStamp = Guid.NewGuid().ToString()
                        });
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
                    var hashed = password.HashPassword(user, config["AdminPassword"]);
                    user.PasswordHash = hashed;

                    var userStore = new UserStore<ApplicationUser>(context);
                    var result = userStore.CreateAsync(user);

                }

                await AssignRoles(serviceProvider, user.Email, roles);

                await context.SaveChangesAsync();
            }
        }

        public static async Task<IdentityResult> AssignRoles(IServiceProvider serviceProvider, string email, List<string> roles)
        {
            using (var scope = serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetService<SegmentSniperDbContext>();
                UserManager<ApplicationUser> _userManager = scope.ServiceProvider.GetService<UserManager<ApplicationUser>>();
                ApplicationUser user = await _userManager.FindByEmailAsync(email);
                var result = await _userManager.AddToRolesAsync(user, roles);

                return result;
            }
        }
    }
}
