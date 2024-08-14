using Microsoft.ML;
using SegmentSniper.Data;
using SegmentSniper.Models.MachineLearning;

namespace SegmentSniper.MachineLearning
{
    public class SegmentTimePredictor
    {
        private readonly MLContext _context;
        private readonly PredictionEngine<SegmentDetailDataForPrediction, SegmentPrediction> _predictionEngine;
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public SegmentTimePredictor(byte[] modelData)
        {
            _context = new MLContext();

            var modelStream = new MemoryStream(modelData);
            ITransformer model = _context.Model.Load(modelStream, out var modelInputSchema);

            _predictionEngine = _context.Model.CreatePredictionEngine<SegmentDetailDataForPrediction, SegmentPrediction>(model);
        }

        public float PredictSegmentEffort(SegmentDetailDataForPrediction segmentForPrediction)
        {
            var prediction = _predictionEngine.Predict(segmentForPrediction);
            return prediction.PredictedTime;
        }
    }
}
