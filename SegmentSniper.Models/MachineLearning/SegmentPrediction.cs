using Microsoft.ML.Data;

namespace SegmentSniper.Models.MachineLearning

{
    public class SegmentPrediction
    {
        [ColumnName("Score")]

        public float PredictedTime { get; set; }
    }
}
