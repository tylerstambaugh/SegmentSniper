using SegmentSniper.Data.Entities.Auth;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SegmentSniper.Data.Entities.StravaToken
{
    public class StravaApiToken
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Users")]
        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }

        public string? RefreshToken { get; set; }

        public long ExpiresAt { get; set; }

        public long ExpiresIn { get; set; }

    }
}

