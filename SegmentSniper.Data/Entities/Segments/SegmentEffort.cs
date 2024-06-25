namespace SegmentSniper.Data.Entities.Segments
{
    public class SegmentEffort
    {
        public int SegmentEffortId { get; set; }
        public string SegmentName { get; set; }
        public long StravaSegmentId { get; set; }
        public long StravaSegmentEffortId { get; set; }
        
        public double ElevationGain { get; set; }
        public double AverageGrade { get; set; }
        public int SegmentPrTime { get; set; }
        public double  Distance { get; set; }
        public int ElapsedTime { get; set; }
        public int? PrRank { get; set; }
        public double AverageHeartRate { get; set; }
        public int KomTime { get; set; }
        public int QomTime { get; set; }
        public int AthleteCount { get; set; }

    }
}
