namespace SegmentSniper.Models.MachineLearning
{
    public class SegmentDetailDataForPrediction
    {
        public float? PreviousEffortTime { get; set; }
        public float Distance { get; set; }
        public float AverageGradient { get; set; }
        public float ElevationGain { get; set; }
        public string SegmentName { get; set; }
        public float? PredictedTime { get; set; }
        public byte[]? ModelData { get; set; }
    }
}
