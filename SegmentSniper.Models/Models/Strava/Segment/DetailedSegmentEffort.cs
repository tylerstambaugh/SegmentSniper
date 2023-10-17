namespace SegmentSniper.Models.Models.Strava.Segment
{
    public class DetailedSegmentEffort
    {
        public long SegmentEffortId { get; set; }
        public string ActivityId { get; set; }
        public string Name { get; set; }
        public int ElapsedTime { get; set; }
        public int MovingTime { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime StartDateLocal { get; set; }
        public double Distance { get; set; }
        public int StartIndex { get; set; }
        public int EndIndex { get; set; }
        public bool DeviceWatts { get; set; }
        public double AverageWatts { get; set; }
        public double AverageHeartrate { get; set; }
        public double MaxHeartrate { get; set; }
        public SummarySegment Segment { get; set; }
        public int? PrRank { get; set; }
        public List<Achievement> Achievements { get; set; }
        public bool Hidden { get; set; }
    }
}
