using StravaApiClient.Models.Misc;

namespace StravaApiClient.Models.Segment
{
    public class DetailedSegmentApiModel
    {
        public string id { get; set; }
        public string name { get; set; }
        public string activity_type { get; set; }
        public double distance { get; set; }
        public double average_grade { get; set; }
        public double maximum_grade { get; set; }
        public double elevation_high { get; set; }
        public double elevation_low { get; set; }
        public List<double> start_latlng { get; set; }
        public List<double> end_latlng { get; set; }
        public string elevation_profile { get; set; }
        public int climb_category { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string country { get; set; }
        public bool @private { get; set; }
        public bool hazardous { get; set; }
        public bool starred { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
        public double total_elevation_gain { get; set; }
        public MapApiModel map { get; set; }
        public int effort_count { get; set; }
        public int athlete_count { get; set; }
        public int star_count { get; set; }
        public AthleteSegmentStatsApiModel athlete_segment_stats { get; set; }
        public XomsApiModel xoms { get; set; }
    }
}
