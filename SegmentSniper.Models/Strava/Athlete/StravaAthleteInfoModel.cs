namespace SegmentSniper.Models.Strava.Athlete
{
    public class StravaAthleteInfoModel
    {
        public int Id { get; set; }

        public string AuthUserId { get; set; }

        public string? RefreshToken { get; set; }

        public long ExpiresAt { get; set; }

        public long ExpiresIn { get; set; }
        public long StravaAthleteId { get; set; }
    }
}
