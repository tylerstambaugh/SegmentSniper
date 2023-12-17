using Newtonsoft.Json;

namespace StravaApiClient.Models.Misc
{
    public class MetaActivityApiModel
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("resource_state")]
        public int ResourceState { get; set; }
    }

}
