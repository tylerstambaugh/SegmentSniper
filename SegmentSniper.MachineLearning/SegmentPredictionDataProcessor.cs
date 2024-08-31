using Microsoft.ML;
using Microsoft.ML.Data;
using SegmentSniper.Models.MachineLearning;
using SegmentSniper.Services.MachineLearning;

namespace SegmentSniper.MachineLearning
{
    public class SegmentPredictionDataProcessor : ISegmentPredictionDataProcessor
    {
        private readonly MLContext _context;
        private PredictionEngine<SegmentDetailDataForPrediction, SegmentPrediction> _predictionEngine;
        private readonly IGetSegmentPredictionTrainingData _getSegmentPredictionTrainingData;
        private readonly IGetSegmentPredictionModel _getSegmentPredictionModel;
        private readonly ISaveSegmentPredictionModel _saveSegmentPredictionModel;
        private readonly ISaveSegmentPredictionRegressionMetrics _saveSegmentPredictionRegressionMetrics;
        private ITransformer _model;
        private RegressionMetrics _regressionMetrics;

        public SegmentPredictionDataProcessor(
            IGetSegmentPredictionTrainingData getSegmentPredictionTrainingData,
            IGetSegmentPredictionModel getSegmentPredictionModel,
            ISaveSegmentPredictionModel saveSegmentPredictionModel,
            ISaveSegmentPredictionRegressionMetrics saveSegmentPredictionRegressionMetrics)
        {
            _context = new MLContext();
            _getSegmentPredictionTrainingData = getSegmentPredictionTrainingData;
            _getSegmentPredictionModel = getSegmentPredictionModel;
            _saveSegmentPredictionModel = saveSegmentPredictionModel;
            _saveSegmentPredictionRegressionMetrics = saveSegmentPredictionRegressionMetrics;
        }

        public async Task TrainModel(string userId)
        {
            var trainingData = await _getSegmentPredictionTrainingData.ExecuteAsync(new GetSegmentPredictionTrainingDataContract(userId));

            if(trainingData.ML_SegmentDataRecords.Count > 0)
            {
                var data = ConvertToIDataView(trainingData.ML_SegmentDataRecords);
                _model = TrainModel(data);
                _regressionMetrics = EvaluateModel(data);
                SaveMetricsToDatabase(_regressionMetrics);
                SaveModelToDatabase(userId);
            }
        }


        //method to update the trained model if sufficient new segment effort recrods exist.

        private IDataView ConvertToIDataView(List<ML_SegmentDataRecord> trainingData)
        {
            try
            {
                var segmentEffortDataList = trainingData.Select(record => new ML_SegmentDataRecord
                {
                    SegmentPrTime = record.SegmentPrTime,
                    Distance = record.Distance,
                    AverageGrade = record.AverageGrade,
                    ElevationGain = record.ElevationGain,
                    MaximumGrade = record.MaximumGrade,
                }).ToList();

                return _context.Data.LoadFromEnumerable(segmentEffortDataList);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("unable to create IDataView", ex);
            }
        }

        private ITransformer TrainModel(IDataView data)
        {
            // Convert numeric columns to Single (float) type
            var convertedData = _context.Transforms.Conversion.ConvertType("SegmentPrTime", outputKind: DataKind.Single)
                .Append(_context.Transforms.Conversion.ConvertType("Distance", outputKind: DataKind.Single))
                .Append(_context.Transforms.Conversion.ConvertType("AverageGrade", outputKind: DataKind.Single))
                .Append(_context.Transforms.Conversion.ConvertType("ElevationGain", outputKind: DataKind.Single))
                .Append(_context.Transforms.Conversion.ConvertType("MaximumGrade", outputKind: DataKind.Single))
                .Append(_context.Transforms.Concatenate("Features",
                    new[]
                    {
                "Distance",
                "AverageGrade",
                "ElevationGain",
                "MaximumGrade",
                "SegmentPrTime"
                    }))
                //.Append(_context.Transforms.Conversion.MapValueToKey("SegmentName")) // Apply this after conversion
                .Fit(data)
                .Transform(data);

            // Split the data into training and test sets
            var dataSplit = _context.Data.TrainTestSplit(convertedData, testFraction: 0.2);

            // Define the training pipeline without SegmentName
            var pipeline = _context.Transforms.Concatenate("Features",
                    "Distance",
                    "AverageGrade",
                    "ElevationGain",
                    "MaximumGrade"
                   )
                .Append(_context.Regression.Trainers.FastTree(
                    labelColumnName: "SegmentPrTime", 
                    numberOfLeaves: 50,
                    minimumExampleCountPerLeaf: 10, 
                    learningRate: 0.1,
                    numberOfTrees: 100 
                ));

            // Train the model
            var model = pipeline.Fit(dataSplit.TrainSet);
            return model;
        }

        public RegressionMetrics EvaluateModel(IDataView data)
        {
            try
            {

                var dataSplit = _context.Data.TrainTestSplit(data, testFraction: 0.2);
                var predictions = _model.Transform(dataSplit.TestSet);
                return _context.Regression.Evaluate(predictions);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error running Evaluate Model", ex);
            }
        }

        private void SaveModelToDatabase(string userId)
        {
            using (var memoryStream = new MemoryStream())
            {
                _context.Model.Save(_model, null, memoryStream);
                var modelBytes = memoryStream.ToArray();

                var segmentPredictionTrainingData = new SegmentPredictionTrainedData
                {
                    UserId = userId,
                    SegmentPredictionModelData = modelBytes,
                    CreatedDate = DateTime.Now,
                    UpdatedDate = DateTime.Now,
                };

                _saveSegmentPredictionModel.ExecuteAsync(new SaveSegmentPredictionModelContract(segmentPredictionTrainingData));
            }
        }

        private void SaveMetricsToDatabase(RegressionMetrics regressionMetrics)
        {
           
        }

        public async Task<SegmentPredictionTrainedData> GetSegmentPredictionTrainedModelData(string userId)
        {
            var result = await _getSegmentPredictionModel.ExecuteAsync(new GetSegmentPredictionModelContract(userId));
            var userSegmentPredictionTrainingData = result.SegmentPredictionTrainingData;
            var trainingRecordsCount = await _getSegmentPredictionTrainingData.GetCountOfTrainingRecords(userId);
            userSegmentPredictionTrainingData.NumberOfSegmentsUsedInModelTraining = trainingRecordsCount;
            return userSegmentPredictionTrainingData;
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

        public async Task<float> PredictSegmentEffort(SegmentDetailDataForPrediction segmentForPrediction, string userId)
        {
            try
            {
                await LoadModelFromDatabase(userId);
                _predictionEngine = _context.Model.CreatePredictionEngine<SegmentDetailDataForPrediction, SegmentPrediction>(_model);
                var prediction = _predictionEngine.Predict(segmentForPrediction);
                return prediction.PredictedTime;
            }
            catch(Exception ex)
            {
                throw;
            }
        }
    }
}
