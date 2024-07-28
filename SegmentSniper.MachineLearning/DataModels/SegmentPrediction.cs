using Microsoft.ML.Data;

namespace SegmentSniper.MachineLearning.DataModels
{
    internal class SegmentPrediction
    {

        [ColumnName("PredictedTime")]
        public float PredictedTime { get; set; }
    }
}
