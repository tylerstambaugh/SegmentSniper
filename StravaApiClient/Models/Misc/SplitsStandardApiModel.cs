using Newtonsoft.Json;

namespace StravaApiClient.Models.Misc
{
    public class SplitStandardApiModel
    {
        [JsonProperty("Distance")]
        public double Distance { get; set; }

        [JsonProperty("ElapsedTime")]
        public int ElapsedTime { get; set; }

        [JsonProperty("ElevationDifference")]
        public double ElevationDifference { get; set; }

        [JsonProperty("MovingTime")]
        public int MovingTime { get; set; }

        [JsonProperty("Split")]
        public int Split { get; set; }

        [JsonProperty("AverageSpeed")]
        public double AverageSpeed { get; set; }

        [JsonProperty("AverageGradeAdjustedSpeed")]
        public object AverageGradeAdjustedSpeed { get; set; }

        [JsonProperty("AverageHeartrate")]
        public double AverageHeartrate { get; set; }

        [JsonProperty("PaceZone")]
        public int PaceZone { get; set; }
    }
}
