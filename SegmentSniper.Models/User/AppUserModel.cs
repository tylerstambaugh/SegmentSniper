using SegmentSniper.Models.Garage;

namespace SegmentSniper.Models.User
{
    public class AppUserModel
    {
        public string AuthUserId { get; set; }

        public string? StravaRefreshToken { get; set; }

        public long StravaTokenExpiresAt { get; set; }

        public long StravaTokenExpiresIn { get; set; }
        public long StravaAthleteId { get; set; }

        public List<BikeModel>? Bikes { get; set; }
        public List<EquipmentModel>? Equipment { get; set; } 
        public List<BikeActivityModel>? BikeActivities { get; set; }
    }
}
