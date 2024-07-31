using Microsoft.ML;
using Microsoft.ML.Data;
using SegmentSniper.Models.MachineLearning;

namespace SegmentSniper.MachineLearning
{
    public interface ISegmentPredictionDataProcessor
    {
        Task<SegmentPredictionTrainingData> DoesUserHaveTrainedModel(string userId);
        RegressionMetrics EvaluateModel(IDataView data);
        Task LoadModelFromDatabase(string userId);
        Task TrainModel(string userId);
    }
}