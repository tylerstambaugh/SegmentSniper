using SegmentSniper.Data;
using SegmentSniper.Data.Entities.MachineLearning;

namespace SegmentSniper.Services.MachineLearning
{
    public class SaveSegmentPredictionRegressionMetrics : ISaveSegmentPredictionRegressionMetrics
    {
        public ISegmentSniperDbContext _context { get; }
        public SaveSegmentPredictionRegressionMetrics(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _context = segmentSniperDbContext;
        }

        public async Task<SaveSegmentPredictionRegressionMetricsContract.Result> ExecuteAsync(SaveSegmentPredictionRegressionMetricsContract contract)
        {
            ValidateContract(contract);

            var metricsToAdd = new SegmentPredictionRegressionMetrics
            {
                UserId = contract.UserId,
                RegressionType = contract.RegressionType,
                NumberOfLeaves = contract.NumberOfLeaves,
                NumberOfTrees = contract.NumberOfTrees,
                MinimumExampleCountPerLeaf = contract.MinimumExampleCountPerLeaf,
                LearningRate = contract.LearningRate,
                MeanAbsoluteError = double.IsNaN(contract.RegressionMetrics.MeanAbsoluteError)
                    ? (double?)null
                    : contract.RegressionMetrics.MeanAbsoluteError,
                MeanSquaredError = double.IsNaN(contract.RegressionMetrics.MeanSquaredError)
                    ? (double?)null
                    : contract.RegressionMetrics.MeanSquaredError,
                LossFunction = double.IsNaN(contract.RegressionMetrics.LossFunction)
                    ? (double?)null
                    : contract.RegressionMetrics.LossFunction,
                RootMeanSquaredError = double.IsNaN(contract.RegressionMetrics.RootMeanSquaredError)
                    ? (double?)null
                    : contract.RegressionMetrics.RootMeanSquaredError,
                RSquared = double.IsNaN(contract.RegressionMetrics.RSquared)
                    ? (double?)null
                    : contract.RegressionMetrics.RSquared
            };

            _context.SegmentPredictionRegressionMetrics.Add(metricsToAdd);
            bool wasSuccess = _context.SaveChanges() == 1;
            return new SaveSegmentPredictionRegressionMetricsContract.Result(wasSuccess);
        }

        private void ValidateContract(SaveSegmentPredictionRegressionMetricsContract contract)
        {
            return;
        }
    }
}
