using Newtonsoft.Json;
using SegmentSniper.Models.Models.Strava.Athlete;
using System.Drawing;

namespace SegmentSniper.Models.Models.Strava.Token
{
    public class StravaApiTokenModel
    {
        [JsonProperty("expires_at")]
        public long ExpiresAt { get; set; }
        [JsonProperty("expires_in")]
        public long ExpiresIn { get; set; }
        [JsonProperty("refresh_token")]
        public string RefreshToken { get; set; }

        public StravaAthleteModel? StravaAthlete { get; set; }
        public StravaApiTokenModel()
        {

        }
    }
}
