namespace SegmentSniper.Models.MachineLearning
{
    public class SegmentPredictionTrainedData
    {
        public string Id { get; set; }
        public string AuthUserId { get; set; }
        public byte [] SegmentPredictionModelData { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }

        public int NumberOfSegmentsUsedInModelTraining { get; set; }
    }
}
