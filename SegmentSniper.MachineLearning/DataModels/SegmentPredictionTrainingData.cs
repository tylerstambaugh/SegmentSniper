using System.ComponentModel.DataAnnotations.Schema;

namespace SegmentSniper.MachineLearning.DataModels
{
    public class SegmentPredictionTrainingData
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string SegmentPredictionModelData { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime UpdatedDate { get; set; } = DateTime.Now;
    }
}
