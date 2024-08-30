namespace SegmentSniper.Models.MachineLearning
{
    public class SegmentDetailDataForPrediction
    {
       // public float? PreviousEffortTime { get; set; }
        public float Distance { get; set; }
        public float AverageGrade { get; set; }
        public float ElevationGain { get; set; }
        public float MaximumGrade { get; set; } = 0f;
        public float SegmentPrTime { get; set; } = 0f;
       //public float AverageHeartRate { get; set; } = 0f;
        //public float AverageSpeed { get; set; } = 0f;

        //public string SegmentName { get; set; }
        // public float? PredictedTime { get; set; }
    }
}
