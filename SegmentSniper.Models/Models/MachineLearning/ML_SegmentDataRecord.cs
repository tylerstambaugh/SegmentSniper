using Microsoft.ML.Data;

namespace SegmentSniper.Models.MachineLearning
{
    public class ML_SegmentDataRecord
    {
        [LoadColumn(1)]
        public float Distance { get; set; }
        [LoadColumn(2)]
        public float ElevationGain { get; set; }
        [LoadColumn(3)]
        public float AverageGrade { get; set; }
        [LoadColumn(4)]
        public float MaximumGrade { get; set; }
        [LoadColumn(5)]
        
        public float SegmentPrTime { get; set; }
       public float Label { get; set; }
        //public int SegmentEffortId { get; set; }
        //public string UserId { get; set; }
        //public string StravaSegmentEffortId { get; set; }
        //public string StravaSegmentId { get; set; }
        //public string SegmentName { get; set; }
        //public int ElapsedTime { get; set; }
        //public float AverageSpeed { get; set; }
        //public float MaximumSpeed { get; set; }
        //public float AverageHeartRate { get; set; }
        //public int KomTime { get; set; }
        //public int QomTime { get; set; }
        //public int AthleteCount { get; set; }
        //public int EffortCount { get; set; }
        //public int StarCount { get; set; }
        //public int PrRank { get; set; }
        //public int Rank { get; set; }
    }
}
