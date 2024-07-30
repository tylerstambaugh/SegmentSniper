using SegmentSniper.Models.MachineLearning;

namespace SegmentSniper.MachineLearning
{
    public interface ISegmentTimePredictionService
    {
        float GetPredictedTime(SegmentDetailDataForPrediction segmentForPrediction);
    }
}