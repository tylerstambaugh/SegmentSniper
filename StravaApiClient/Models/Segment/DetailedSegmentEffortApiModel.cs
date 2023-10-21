namespace StravaApiClient.Models.Segment
{
    public class DetailedSegmentEffortApiModel
    {
        public string id { get; set; }
        public int resource_state { get; set; }
        public string name { get; set; }
        public int elapsed_time { get; set; }
        public int moving_time { get; set; }
        public DateTime start_date { get; set; }
        public DateTime start_date_local { get; set; }
        public double distance { get; set; }
        public int start_index { get; set; }
        public int end_index { get; set; }
        public bool device_watts { get; set; }
        public double average_watts { get; set; }
        public double average_heartrate { get; set; }
        public double max_heartrate { get; set; }
        public SummarySegmentApiModel segment { get; set; }
        public int? pr_rank { get; set; }
        public List<AchievementApiModel> achievements { get; set; }
        public bool hidden { get; set; }
    }
}
