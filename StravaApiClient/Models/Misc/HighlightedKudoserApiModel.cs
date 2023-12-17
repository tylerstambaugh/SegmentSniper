using Newtonsoft.Json;

namespace StravaApiClient.Models.Misc
{
    public class HighlightedKudoserApiModel
    {
        [JsonProperty("destination_url")]
        public string DestinationUrl { get; set; }

        [JsonProperty("display_name")]
        public string DisplayName { get; set; }

        [JsonProperty("avatar_url")]
        public string AvatarUrl { get; set; }

        [JsonProperty("show_name")]
        public bool ShowName { get; set; }
    }
}
