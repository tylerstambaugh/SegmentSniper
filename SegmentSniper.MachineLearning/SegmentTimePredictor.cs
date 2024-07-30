using Microsoft.ML;
using SegmentSniper.Models.MachineLearning;

namespace SegmentSniper.MachineLearning
{
    public class SegmentTimePredictor
    {
        private readonly MLContext _context;
        private readonly PredictionEngine<SegmentDetailDataForPrediction, SegmentPrediction> _predictionEngine;

        public SegmentTimePredictor(string modelPath)
        {
            _context = new MLContext();
            var model = _context.Model.Load(modelPath, out var modelInputSchema);
            //_predictionEngine = _context.Model.CreatePredictionEngine<SegmentDetailDataForPrediction, SegmentPredictionTrainingData>(model);
        }

        public float PredictSegmentEffort(SegmentDetailDataForPrediction segmentForPrediction)
        {
            var prediction = _predictionEngine.Predict(segmentForPrediction);
            return prediction.PredictedTime;
        }
    }
}
