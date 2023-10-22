namespace StravaApiClient.Models.Segment
{
    public class SummarySegmentApiModel
    {
        public long id { get; set; }
        public string name { get; set; }
        public string activity_type { get; set; }
        public double distance { get; set; }
        public double average_grade { get; set; }
        public double maximum_grade { get; set; }
        public double elevation_high { get; set; }
        public double elevation_low { get; set; }
        public List<double> start_latlng { get; set; }
        public List<double> end_latlng { get; set; }
        public object elevation_profile { get; set; }
        public int climb_category { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string country { get; set; }
        public bool @private { get; set; }
        public bool hazardous { get; set; }
        public bool starred { get; set; }
    }
}
