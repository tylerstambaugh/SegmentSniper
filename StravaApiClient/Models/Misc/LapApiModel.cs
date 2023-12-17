using Newtonsoft.Json;

namespace StravaApiClient.Models.Misc
{
    public class Lap
    {
        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("resource_state")]
        public int ResourceState { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("activity")]
        public MetaActivityApiModel Activity { get; set; }

        [JsonProperty("athlete")]
        public MetaAthleteApiModel Athlete { get; set; }

        [JsonProperty("elapsed_time")]
        public int ElapsedTime { get; set; }

        [JsonProperty("moving_time")]
        public int MovingTime { get; set; }

        [JsonProperty("start_date")]
        public DateTime StartDate { get; set; }

        [JsonProperty("start_date_local")]
        public DateTime StartDateLocal { get; set; }

        [JsonProperty("distance")]
        public double Distance { get; set; }

        [JsonProperty("start_index")]
        public int StartIndex { get; set; }

        [JsonProperty("end_index")]
        public int EndIndex { get; set; }

        [JsonProperty("total_elevation_gain")]
        public int TotalElevationGain { get; set; }

        [JsonProperty("average_speed")]
        public double AverageSpeed { get; set; }

        [JsonProperty("max_speed")]
        public double MaxSpeed { get; set; }

        [JsonProperty("average_cadence")]
        public double AverageCadence { get; set; }

        [JsonProperty("device_watts")]
        public bool DeviceWatts { get; set; }

        [JsonProperty("average_watts")]
        public double AverageWatts { get; set; }

        [JsonProperty("lap_index")]
        public int LapIndex { get; set; }

        [JsonProperty("split")]
        public int Split { get; set; }
    }
}
