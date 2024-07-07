using Microsoft.ML.Data;

namespace SegmentSniper.MachineLearning.DataModels
{
    internal class SegmentPrediction
    {

        [ColumnName("Score")]
        public float PredictedTime { get; set; }
    }
}
