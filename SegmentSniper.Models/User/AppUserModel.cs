namespace SegmentSniper.Models.User
{
    public class AppUserModel
    {

        public int Id { get; set; }

        public string AuthUserId { get; set; }

        public string? StravaRefreshToken { get; set; }

        public long StravaTokenExpiresAt { get; set; }

        public long StravaTokenExpiresIn { get; set; }
        public long StravaAthleteId { get; set; }
    }
}
