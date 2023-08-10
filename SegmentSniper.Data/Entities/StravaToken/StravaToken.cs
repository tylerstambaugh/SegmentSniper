using System.ComponentModel.DataAnnotations;

namespace SegmentSniper.Data.Entities.StravaToken
{
    public class StravaToken
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }

        public string? AuthorizationToken { get; set; }

        public string? RefreshToken { get; set; }

        public long ExpiresAt { get; set; }

        public long ExpiresIn { get; set; }

    }
}

