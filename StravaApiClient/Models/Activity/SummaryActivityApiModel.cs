using StravaApiClient.Models.Misc;

namespace StravaApiClient.Models.Activity
{
    public class SummaryActivityModel
    {
        public string id { get; set; }
        public string name { get; set; }
        public double distance { get; set; }
        public int moving_time { get; set; }
        public int elapsed_time { get; set; }
        public double total_elevation_gain { get; set; }
        public string type { get; set; }
        public string sport_type { get; set; }
        public int workout_type { get; set; }
        public DateTime start_date { get; set; }
        public DateTime start_date_local { get; set; }
        public string timezone { get; set; }
        public double utc_offset { get; set; }
        public object location_city { get; set; }
        public object location_state { get; set; }
        public int achievement_count { get; set; }
        public int kudos_count { get; set; }
        public int comment_count { get; set; }
        public int athlete_count { get; set; }
        public int photo_count { get; set; }
        public MapApiModel map { get; set; }
        public string visibility { get; set; }
        public double average_speed { get; set; }
        public double max_speed { get; set; }
        public double average_watts { get; set; }
        public double kilojoules { get; set; }
        public bool device_watts { get; set; }
        public bool has_heartrate { get; set; }
        public double average_heartrate { get; set; }
        public double max_heartrate { get; set; }
        public double elev_high { get; set; }
        public double elev_low { get; set; }
        public int pr_count { get; set; }
        public int total_photo_count { get; set; }
        public bool has_kudoed { get; set; }
        public int? average_temp { get; set; }

    }
}