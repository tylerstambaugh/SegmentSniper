using Newtonsoft.Json;

namespace StravaApiClient.Models.Misc
{
    public class MapApiModel
    {
        [JsonProperty("id")]
        public string id { get; set; }
        [JsonProperty("polyline")]
        public string polyline { get; set; }
        [JsonProperty("summary_polyline")]
        public string summary_polyline { get; set; }
    }
}
