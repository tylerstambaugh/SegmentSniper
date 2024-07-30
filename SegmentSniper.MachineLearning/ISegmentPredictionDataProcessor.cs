using Microsoft.ML;
using Microsoft.ML.Data;

namespace SegmentSniper.MachineLearning
{
    public interface ISegmentPredictionDataProcessor
    {
        Task<bool> DoesUserHaveTrainedModel(string userId);
        RegressionMetrics EvaluateModel(IDataView data);
        Task LoadModelFromDatabase(string userId);
        Task TrainModel(string userId);
    }
}