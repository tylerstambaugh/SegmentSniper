//using Microsoft.ML;
//using SegmentSniper.Data;
//using SegmentSniper.Models.MachineLearning;

//namespace SegmentSniper.MachineLearning
//{
//    public class SegmentTimePredictor : ISegmentTimePredictor
//    {
//        private readonly MLContext _context;
//        private PredictionEngine<SegmentDetailDataForPrediction, SegmentPrediction> _predictionEngine;
//        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

//        public SegmentTimePredictor()
//        {
//            _context = new MLContext();
//        }

//        public float PredictSegmentEffort(SegmentDetailDataForPrediction segmentForPrediction)
//        {
//            var modelStream = new MemoryStream(segmentForPrediction.ModelData);
//            ITransformer model = _context.Model.Load(modelStream, out var modelInputSchema);

//            _predictionEngine = _context.Model.CreatePredictionEngine<SegmentDetailDataForPrediction, SegmentPrediction>(model);
//            var prediction = _predictionEngine.Predict(segmentForPrediction);
//            return prediction.PredictedTime;
//        }
//    }
//}
