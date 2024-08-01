using Microsoft.ML;
using Microsoft.ML.Data;
using SegmentSniper.Models.MachineLearning;
using SegmentSniper.Services.MachineLearning;

namespace SegmentSniper.MachineLearning
{
    public class SegmentPredictionDataProcessor : ISegmentPredictionDataProcessor
    {
        private readonly MLContext _context;
        private readonly IGetSegmentPredictionTrainingData _getSegmentPredictionTrainingData;
        private readonly IGetSegmentPredictionModel _getSegmentPredictionModel;
        private readonly ISaveSegmentPredictionModel _saveSegmentPredictionModel;
        private ITransformer _model;

        public SegmentPredictionDataProcessor(
            IGetSegmentPredictionTrainingData getSegmentPredictionTrainingData,
            IGetSegmentPredictionModel getSegmentPredictionModel,
            ISaveSegmentPredictionModel saveSegmentPredictionModel)
        {
            _context = new MLContext();
            _getSegmentPredictionTrainingData = getSegmentPredictionTrainingData;
            _getSegmentPredictionModel = getSegmentPredictionModel;
            _saveSegmentPredictionModel = saveSegmentPredictionModel;
        }

        public async Task TrainModel(string userId)
        {
            var trainingData = await _getSegmentPredictionTrainingData.ExecuteAsync(new GetSegmentPredictionTrainingDataContract(userId));

            var data = ConvertToIDataView(trainingData.ML_SegmentDataRecords);
            _model = TrainModel(data);
            SaveModelToDatabase(userId);
        }

        //method to update the trained model if sufficient new segment effort recrods exist.

        private IDataView ConvertToIDataView(List<ML_SegmentDataRecord> trainingData)
        {
            var segmentEffortDataList = trainingData.Select(record => new ML_SegmentDataRecord
            {
                SegmentPrTime = record.SegmentPrTime,
                Distance = record.Distance,
                AverageGrade = record.AverageGrade,
                ElevationGain = record.ElevationGain,
                AverageHeartRate = record.AverageHeartRate,
                AverageSpeed = record.AverageSpeed,
                SegmentName = record.SegmentName
            }).ToList();

            return _context.Data.LoadFromEnumerable(segmentEffortDataList);
        }

        private ITransformer TrainModel(IDataView data)
        {
            var dataSplit = _context.Data.TrainTestSplit(data, testFraction: 0.2);
            var pipeline = _context.Transforms.Categorical.OneHotEncoding("SegmentName")
                .Append(_context.Transforms.Concatenate("Features", "SegmentPrTime", "Distance", "AverageGrade", "ElevationGain", "AverageHeartRate", "AverageSpeed", "SegmentName"))
                .Append(_context.Regression.Trainers.FastTree());

            return pipeline.Fit(dataSplit.TrainSet);
        }

        public RegressionMetrics EvaluateModel(IDataView data)
        {
            var dataSplit = _context.Data.TrainTestSplit(data, testFraction: 0.2);
            var predictions = _model.Transform(dataSplit.TestSet);
            return _context.Regression.Evaluate(predictions);
        }

        private void SaveModelToDatabase(string userId)
        {
            using (var memoryStream = new MemoryStream())
            {
                _context.Model.Save(_model, null, memoryStream);
                var modelBytes = memoryStream.ToArray();

                var segmentPredictionTrainingData = new SegmentPredictionTrainingData
                {
                    UserId = userId,
                    SegmentPredictionModelData = modelBytes,
                    CreatedDate = DateTime.Now,
                    UpdatedDate = DateTime.Now,
                };

                _saveSegmentPredictionModel.ExecuteAsync(new SaveSegmentPredictionModelContract(segmentPredictionTrainingData));

            }
        }

        public async Task<SegmentPredictionTrainingData> DoesUserHaveTrainedModel(string userId)
        {
            var userModel = await _getSegmentPredictionModel.ExecuteAsync(new GetSegmentPredictionModelContract(userId));
            var trainingRecordsCount = await _getSegmentPredictionTrainingData.GetCountOfTrainingRecords(userId);
            //need to include the count
            //userModel.SegmentPredictionTrainingData.C
            return userModel.SegmentPredictionTrainingData;
        }

        public async Task LoadModelFromDatabase(string userId)
        {
            var userModel = await _getSegmentPredictionModel.ExecuteAsync(new GetSegmentPredictionModelContract(userId));

            if (userModel == null)
                throw new Exception("Model not found for user.");

            using (var memoryStream = new MemoryStream(userModel.SegmentPredictionTrainingData.SegmentPredictionModelData))
            {
                _model = _context.Model.Load(memoryStream, out _);
            }
        }

        //public async Task<float> Predict(ML_SegmentDataRecord segmentData, string userId)
        //{
        //   await LoadModelFromDatabase(userId);

        //    var predictionEngine = _context.Model.CreatePredictionEngine<ML_SegmentDataRecord, SegmentDetailDataForPrediction>(_model);
        //    var prediction = predictionEngine.Predict(segmentData);
        //    return prediction.PredictedTime;
        //}
    }
}
