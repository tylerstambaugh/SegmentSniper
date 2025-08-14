using System.ComponentModel.DataAnnotations;

namespace SegmentSniper.Data.Entities.StravaToken
{
    public class StravaAthleteInfo
    {
        [Key]
        public int Id { get; set; }

        public string AuthUserId { get; set; }

        public string? RefreshToken { get; set; }

        public long ExpiresAt { get; set; }

        public long ExpiresIn { get; set; }
        public string StravaAthleteId { get; set; }
    }
}

