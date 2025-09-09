using SegmentSniper.Models.Strava.Misc;

namespace SegmentSniper.Models.Strava.Segment
{
    public class DetailedSegment
    {
        public string SegmentId { get; set; }
        public string Name { get; set; }
        public string ActivityType { get; set; }
        public double Distance { get; set; }
        public double AverageGrade { get; set; }
        public double MaximumGrade { get; set; }
        public double ElevationHigh { get; set; }
        public double ElevationLow { get; set; }
        public List<double> StartLatlng { get; set; }
        public List<double> EndLatlng { get; set; }
        public string ElevationProfile { get; set; }
        public int ClimbCategory { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public bool Private { get; set; }
        public bool Hazardous { get; set; }
        public bool Starred { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public double TotalElevationGain { get; set; }
        public MapModel? Map { get; set; }
        public int EffortCount { get; set; }
        public int AthleteCount { get; set; }
        public int StarCount { get; set; }
        public AthleteSegmentStats? AthleteSegmentStats { get; set; }
        public Xoms? Xoms { get; set; }
        public LocalLegend? LocalLegend { get; set; }
    }
}
