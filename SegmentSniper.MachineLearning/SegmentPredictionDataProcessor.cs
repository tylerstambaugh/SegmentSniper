using Microsoft.ML;
using Microsoft.ML.Data;
using SegmentSniper.Models.MachineLearning;
using SegmentSniper.Services.MachineLearning;
using Serilog;
using static Microsoft.ML.RegressionCatalog;
using static Microsoft.ML.Vision.ImageClassificationTrainer;

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
        private readonly int _numberOfLeaves = 50;
        private readonly int _minimumExampleCountPerLeaf = 10;
        private readonly double _learningRate = 0.1;
        private readonly int _numberOfTrees = 100;
        //private readonly string _regressionType = typeof(RegressionTrainers).GetMethods().First(m => m.Name == "FastTree").Name;
        private readonly string _regressionType = "FastTree";

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
               // await SaveMetricsToDatabase(userId);
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
            // Step 1: Convert numeric columns to Single (float) type
            var convertPipeline = _context.Transforms.Conversion.ConvertType("SegmentPrTime", outputKind: DataKind.Single)
                .Append(_context.Transforms.Conversion.ConvertType("Distance", outputKind: DataKind.Single))
                .Append(_context.Transforms.Conversion.ConvertType("AverageGrade", outputKind: DataKind.Single))
                .Append(_context.Transforms.Conversion.ConvertType("ElevationGain", outputKind: DataKind.Single))
                .Append(_context.Transforms.Conversion.ConvertType("MaximumGrade", outputKind: DataKind.Single));

            // Step 2: Concatenate the features
            var featurePipeline = convertPipeline.Append(
                _context.Transforms.Concatenate("Features", new[]
                {
            "Distance",
            "AverageGrade",
            "ElevationGain",
            "MaximumGrade"
                }));

            // Step 3: Fit the pipeline and split the data into training and test sets
            var transformedData = featurePipeline.Fit(data).Transform(data);
            var dataSplit = _context.Data.TrainTestSplit(transformedData, testFraction: 0.2);

            // Step 4: Define the regression trainer pipeline
            var pipeline = _context.Transforms.Concatenate("Features",
                    "Distance", "AverageGrade", "ElevationGain", "MaximumGrade")
                .Append(_context.Regression.Trainers.LbfgsPoissonRegression(
                    labelColumnName: "SegmentPrTime",
                    l1Regularization: (float)0.01,
                    l2Regularization: (float)0.01,
                    optimizationTolerance: (float)1e-5,
                    historySize: 20,
                    enforceNonNegativity: true
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
                return _context.Regression.Evaluate(predictions, labelColumnName: "SegmentPrTime");
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

        private async Task SaveMetricsToDatabase(string userId)
        {
            try
            {
                var result = await _saveSegmentPredictionRegressionMetrics.ExecuteAsync(new SaveSegmentPredictionRegressionMetricsContract
                {
                    UserId = userId,
                    RegressionType = _regressionType,
                    RegressionMetrics = _regressionMetrics,
                    LearningRate = _learningRate,
                    NumberOfLeaves = _numberOfLeaves,
                    NumberOfTrees = _numberOfTrees,
                    MinimumExampleCountPerLeaf = _minimumExampleCountPerLeaf,
                });

                //do something with the result?
            }
            catch (Exception ex)
            {
                Log.Debug($"Error saving regression metrics training data: {ex.Message}");
                throw new ApplicationException("Error saving regression metrics", ex);
            }
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
