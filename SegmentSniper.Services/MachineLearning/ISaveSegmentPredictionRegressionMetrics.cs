using Microsoft.ML.Data;
using SegmentSniper.Data;
using SegmentSniper.Services.Interface;

namespace SegmentSniper.Services.MachineLearning
{
    public interface ISaveSegmentPredictionRegressionMetrics : IExecutableServiceAsync<SaveSegmentPredictionRegressionMetricsContract, SaveSegmentPredictionRegressionMetricsContract.Result>
    {
        ISegmentSniperDbContext _context { get; }

        Task<SaveSegmentPredictionRegressionMetricsContract.Result> ExecuteAsync(SaveSegmentPredictionRegressionMetricsContract contract);
    }

    public class SaveSegmentPredictionRegressionMetricsContract
    {
        public string UserId { get; set; }
        public string RegressionType { get; set; }
        public int NumberOfLeaves { get; set; }
        public int MinimumExampleCountPerLeaf { get; set; }
        public double LearningRate { get; set; }
        public int NumberOfTrees { get; set; }
        public RegressionMetrics RegressionMetrics { get; set; }

        public class Result
        {
            public Result(bool success)
            {
                Success = success;
            }

            public bool Success { get; set; }
        }
    }
}