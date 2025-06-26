using Microsoft.AspNetCore.Identity;

namespace SegmentSniper.Data.Entities.Auth
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiration { get; set; }
        public DateTime LastLogin { get; set; }
        public int? EmailChangeVerificationCode { get; set; }
        public long? StravaAthleteId { get; set; } 
    }
}
