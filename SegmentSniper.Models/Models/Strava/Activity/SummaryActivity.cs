using Newtonsoft.Json;
using SegmentSniper.Models.Models.Strava.Misc;

namespace SegmentSniper.Models.Models.Strava.Activity
{
    public class SummaryActivity
    {
        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("type")]
        public string Type { get; set; }
        [JsonProperty("start_date")]
        public DateTime StartDate { get; set; }
        [JsonProperty("distance")]
        public float Distance { get; set; }
        [JsonProperty("moving_time")]
        public int MovingTime { get; set; }
        [JsonProperty("elapsed_time")]
        public int ElapsedTime { get; set; }
        [JsonProperty("average_speed")]
        public float AverageSpeed { get; set; }
        [JsonProperty("max_speed")]
        public float MaxSpeed { get; set; }
        [JsonProperty("total-elevation_gain")]
        public float ElevationGain { get; set; }
        [JsonProperty("achievement_count")]
        public int AchievementCount { get; set; }
        [JsonProperty("athlete_count")]
        public int AthleteCount { get; set; }
        [JsonProperty("map")]
        public MapModel Map { get; set; }

    }
}
