using Newtonsoft.Json;
using SegmentSniper.Models.Models.Strava.Athlete;
using System.Drawing;

namespace SegmentSniper.Models.Models.Strava.Token
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
