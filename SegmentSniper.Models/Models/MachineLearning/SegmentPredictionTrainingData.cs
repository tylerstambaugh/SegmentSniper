namespace SegmentSniper.Models.MachineLearning
{
    public class SegmentPredictionTrainingData
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public byte [] SegmentPredictionModelData { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime UpdatedDate { get; set; } = DateTime.Now;

        public int NumberOfSegmentsUsedInModelTraining { get; set; }
    }
}
