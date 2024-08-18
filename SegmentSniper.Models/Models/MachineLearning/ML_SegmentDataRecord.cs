namespace SegmentSniper.Models.MachineLearning
{
    public class ML_SegmentDataRecord
    {
        public int SegmentEffortId { get; set; }
        public float Label { get; set; }
        public string UserId { get; set; }
        public string StravaSegmentEffortId { get; set; }
        public string StravaSegmentId { get; set; }
        //public string SegmentName { get; set; }
        public int ElapsedTime { get; set; }
        public int SegmentPrTime { get; set; }
        public float Distance { get; set; }
        public float AverageSpeed { get; set; }
        public float MaximumSpeed { get; set; }
        public float ElevationGain { get; set; }
        public float AverageGrade { get; set; }
        public float MaximumGrade { get; set; }
        public int AverageHeartRate { get; set; }
        public int KomTime { get; set; }
        public int QomTime { get; set; }
        public int AthleteCount { get; set; }
        public int EffortCount { get; set; }
        public int StarCount { get; set; }
        public int PrRank { get; set; }
        public int Rank { get; set; }
    }
}
