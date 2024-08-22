namespace SegmentSniper.Models.MachineLearning
{
    public class SegmentPredictionTrainingData
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public byte [] SegmentPredictionModelData { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }

        public int NumberOfSegmentsUsedInModelTraining { get; set; }
    }
}
