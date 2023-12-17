using Newtonsoft.Json;

namespace StravaApiClient.Models.Misc
{
    public class GearApiModel
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("primary")]
        public bool Primary { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("resource_state")]
        public int ResourceState { get; set; }

        [JsonProperty("distance")]
        public long Distance { get; set; }
    }
}
