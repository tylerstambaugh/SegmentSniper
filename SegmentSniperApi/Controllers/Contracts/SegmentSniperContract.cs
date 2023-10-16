using Newtonsoft.Json;

namespace SegmentSniper.Api.Controllers.Contracts
{
    public class SegmentSniperContract
    {
        [JsonProperty("activityId")]
        public string ActivityId { get; set; }
        [JsonProperty("secondsOff")]
        public int? SecondsFromKom { get; set; }
        [JsonProperty("percentageOff")]
        public int? PercentageFromKom { get; set; }
        [JsonProperty("useQom")]
        public bool UseQom { get; set; }
    }
}
