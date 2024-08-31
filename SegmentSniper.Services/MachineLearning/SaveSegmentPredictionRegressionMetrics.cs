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
                RegressionType = contract.RegressionType,
                NumberOfLeaves = contract.NumberOfLeaves,
                NumberOfTrees = contract.NumberOfTrees,
                MinimumExampleCountPerLeaf = contract.MinimumExampleCountPerLeaf,
                LearningRate = contract.LearningRate,
                MeanAbsoluteError = contract.RegressionMetrics.MeanAbsoluteError,
                MeanSquaredError = contract.RegressionMetrics.MeanSquaredError,
                LossFunction = contract.RegressionMetrics.LossFunction,
                RootMeanSquaredError = contract.RegressionMetrics.RootMeanSquaredError,
                RSquared = contract.RegressionMetrics.RSquared
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
