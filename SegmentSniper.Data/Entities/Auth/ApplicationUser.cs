using Microsoft.AspNetCore.Identity;

namespace SegmentSniper.Data.Entities.Auth
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
