using SegmentSniper.Models.MachineLearning;

namespace SegmentSniper.MachineLearning
{
    public class SegmentTimePredictionService : ISegmentTimePredictionService
    {
        private readonly SegmentTimePredictor _segmentTimePredictor;

        public SegmentTimePredictionService(string modelPath)
        {
            _segmentTimePredictor = new SegmentTimePredictor(modelPath);
        }

        public float GetPredictedTime(SegmentDetailDataForPrediction segmentForPrediction)
        {
            return _segmentTimePredictor.PredictSegmentEffort(segmentForPrediction);
        }
    }

}
