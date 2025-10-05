using SegmentSniper.Data.Entities.Garage;
using SegmentSniper.Data.Entities.MachineLearning;
using SegmentSniper.Data.Enums;
using System.ComponentModel.DataAnnotations;

namespace SegmentSniper.Data.Entities.User
{
    public class AppUser
    {
        [Key]
        public required string AuthUserId { get; set; }

        public string? StravaRefreshToken { get; set; }

        public long? StravaTokenExpiresAt { get; set; }

        public long? StravaTokenExpiresIn { get; set; }
        public long? StravaAthleteId { get; set; }     
        public List<RolesEnum> Roles { get; set; } = new List<RolesEnum> { RolesEnum.User };
        public string Plan { get; set; } = "Free";

        public ICollection<Bike>? Bikes { get; set; } = new List<Bike>();
        public ICollection<Equipment>? Equipment { get; set; } = new List<Equipment>();
        public ICollection<BikeActivity>? BikeActivities { get; set; } = new List<BikeActivity>();
        public virtual SegmentPredictionRegressionMetrics? RegressionMetrics { get; set; }
    }
}

