using System.ComponentModel.DataAnnotations;

namespace SegmentSniper.Data.Entities.MachineLearning
{
    public class SegmentPredictionRegressionMetrics
    {
        [Key]
        public int Id { get; set; }
        public string RegressionType { get; set; }
        public int NumberOfLeaves { get; set; }
        public int MinimumExampleCountPerLeaf { get; set; }
        public int LearningRate { get; set; }
        public int NumberOfTrees { get; set; }

        public double MeanAbsoluteError { get; set; }
        public double MeanSquaredError { get; set; }
        public double RootMeanSquaredError { get; set; }
        public double LossFunction { get; set; }
        public double RSquared { get; set; }

    }
}
