using SegmentSniper.Models.MachineLearning;

namespace SegmentSniper.MachineLearning
{
    public interface ISegmentTimePredictor
    {
        float PredictSegmentEffort(SegmentDetailDataForPrediction segmentForPrediction);
    }
}