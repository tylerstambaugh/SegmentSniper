using Newtonsoft.Json;
using System.Drawing;

namespace SegmentSniper.Models.Models.Strava.Token
{
    public class StravaApiTokenModel
    {
        [JsonProperty("access_token")]
        public string AccessToken { get; }
        [JsonProperty("expires_at")]
        public int ExpiresAt { get; }
        [JsonProperty("expires_in")]
        public int ExpiresIn { get; }
        [JsonProperty("refresh_token")]
        public string RefreshToken { get; }

        public StravaApiTokenModel()
        {

        }

    }
}
