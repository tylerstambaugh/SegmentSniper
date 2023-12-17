using Newtonsoft.Json;

namespace StravaApiClient.Models.Misc
{
    public class PhotosApiModel
    {
        [JsonProperty("primary")]
        public Photo Primary { get; set; }

        [JsonProperty("use_primary_photo")]
        public bool UsePrimaryPhoto { get; set; }

        [JsonProperty("count")]
        public int Count { get; set; }
    }

    public class Photo
    {
        [JsonProperty("id")]
        public object Id { get; set; }

        [JsonProperty("unique_id")]
        public string UniqueId { get; set; }

        [JsonProperty("urls")]
        public Dictionary<string, string> Urls { get; set; }

        [JsonProperty("source")]
        public int Source { get; set; }
    }
}
