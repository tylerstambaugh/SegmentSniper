namespace SegmentSniper.Models.UIModels.MachineLearning
{
    public class SegmentPredictionTrainingDataUiModel
    {
        public string Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public int NumberOfSegmentsUsedInModelTraining { get; set; }
    }
}
