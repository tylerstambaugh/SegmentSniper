using System.ComponentModel.DataAnnotations;

namespace SegmentSniper.Data.Entities.User
{
    public class AppUser
    {
        [Key]
        public int Id { get; set; }

        public string AuthUserId { get; set; }

        public string? StravaRefreshToken { get; set; }

        public long StravaTokenExpiresAt { get; set; }

        public long StravaTokenExpiresIn { get; set; }
        public long StravaAthleteId { get; set; }
    }
}

