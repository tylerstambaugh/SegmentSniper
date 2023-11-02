using Newtonsoft.Json;

namespace SegmentSniper.Api.Controllers.Contracts
{
    public class SegmentSniperContract
    {
        [JsonProperty("activityId")]
        public string ActivityId { get; set; }
        [JsonProperty("secondsOff")]
        public int? SecondsOff { get; set; }
        [JsonProperty("percentageOff")]
        public int? PercentageOff { get; set; }
        [JsonProperty("useQom")]
        public bool UseQom { get; set; }
    }
}
