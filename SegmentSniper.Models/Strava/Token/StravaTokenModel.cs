using SegmentSniper.Models.Strava.Athlete;

namespace SegmentSniper.Models.Strava.Token
{
    public class StravaTokenModel
    {
        public long ExpiresAt { get; set; }
        public long ExpiresIn { get; set; }
        public string RefreshToken { get; set; }

        public StravaAthleteModel? StravaAthlete { get; set; }
        public StravaTokenModel()
        {

        }
    }
}
