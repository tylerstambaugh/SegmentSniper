using Newtonsoft.Json;
using StravaApiClient.Models.Misc;
using StravaApiClient.Models.Segment;

namespace StravaApiClient.Models.Activity
{
    public class DetailedActivityApiModel
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("distance")]
        public double Distance { get; set; }

        [JsonProperty("moving_time")]
        public int MovingTime { get; set; }

        [JsonProperty("elapsed_time")]
        public int ElapsedTime { get; set; }

        [JsonProperty("total_elevation_gain")]
        public double TotalElevationGain { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("sport_type")]
        public string SportType { get; set; }

        [JsonProperty("workout_type")]
        public int WorkoutType { get; set; }

        [JsonProperty("start_date")]
        public DateTime StartDate { get; set; }

        [JsonProperty("start_date_local")]
        public DateTime StartDateLocal { get; set; }

        [JsonProperty("timezone")]
        public string Timezone { get; set; }

        [JsonProperty("utc_offset")]
        public double UtcOffset { get; set; }

        [JsonProperty("location_city")]
        public object LocationCity { get; set; }

        [JsonProperty("location_state")]
        public object LocationState { get; set; }

        [JsonProperty("location_country")]
        public string LocationCountry { get; set; }

        [JsonProperty("achievement_count")]
        public int AchievementCount { get; set; }

        [JsonProperty("kudos_count")]
        public int KudosCount { get; set; }

        [JsonProperty("comment_count")]
        public int CommentCount { get; set; }

        [JsonProperty("athlete_count")]
        public int AthleteCount { get; set; }

        [JsonProperty("photo_count")]
        public int PhotoCount { get; set; }

        [JsonProperty("map")]
        public MapApiModel Map { get; set; }

        [JsonProperty("private")]
        public bool IsPrivate { get; set; }

        [JsonProperty("visibility")]
        public string Visibility { get; set; }

        [JsonProperty("start_latlng")]
        public List<double> StartLatLng { get; set; }

        [JsonProperty("end_latlng")]
        public List<double> EndLatLng { get; set; }

        [JsonProperty("average_speed")]
        public double AverageSpeed { get; set; }

        [JsonProperty("max_speed")]
        public double MaxSpeed { get; set; }

        [JsonProperty("average_watts")]
        public double AverageWatts { get; set; }

        [JsonProperty("kilojoules")]
        public double Kilojoules { get; set; }

        [JsonProperty("device_watts")]
        public bool DeviceWatts { get; set; }

        [JsonProperty("has_heartrate")]
        public bool HasHeartRate { get; set; }

        [JsonProperty("average_heartrate")]
        public double AverageHeartRate { get; set; }

        [JsonProperty("max_heartrate")]
        public double MaxHeartRate { get; set; }

        [JsonProperty("elev_high")]
        public double ElevationHigh { get; set; }

        [JsonProperty("elev_low")]
        public double ElevationLow { get; set; }

        [JsonProperty("pr_count")]
        public int PrCount { get; set; }

        [JsonProperty("total_photo_count")]
        public int TotalPhotoCount { get; set; }

        [JsonProperty("has_kudoed")]
        public bool HasKudoed { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("calories")]
        public double Calories { get; set; }

        [JsonProperty("perceived_exertion")]
        public object PerceivedExertion { get; set; }

        [JsonProperty("prefer_perceived_exertion")]
        public object PreferPerceivedExertion { get; set; }

        [JsonProperty("segment_efforts")]
        public List<DetailedSegmentEffortApiModel> SegmentEfforts { get; set; }

        [JsonProperty("private_note")]
        public string PrivateNote { get; set; }

        [JsonProperty("available_zones")]
        public List<object> AvailableZones { get; set; }
    }
}
