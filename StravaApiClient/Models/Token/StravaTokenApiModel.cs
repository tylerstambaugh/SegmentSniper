using Newtonsoft.Json;
using StravaApiClient.Models.Athlete;

namespace StravaApiClient.Models.Token
{
    public class StravaTokenApiModel
    {
        [JsonProperty("expires_at")]
        public long ExpiresAt { get; set; }
        [JsonProperty("expires_in")]
        public long ExpiresIn { get; set; }
        [JsonProperty("refresh_token")]
        public required string RefreshToken { get; set; }
        [JsonProperty("athlete")]
        public StravaAthleteApiModel? StravaApiAthlete { get; set; }

        public StravaTokenApiModel()
        {
            
        }

    }
}
