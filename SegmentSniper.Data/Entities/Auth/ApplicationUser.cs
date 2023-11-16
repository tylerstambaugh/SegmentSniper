using Microsoft.AspNetCore.Identity;

namespace SegmentSniper.Data.Entities.Auth
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            UserRoles = new List<IdentityUserRole<string>>();
        }

        public string FirstName { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiration { get; set; }
        public ICollection<IdentityUserRole<string>> UserRoles { get; set; }

    }
}
