using SegmentSniper.Data.Entities.User;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SegmentSniper.Data.Entities.MachineLearning
{
    public class SegmentPredictionRegressionMetrics
    {
        [Key]
        public int Id { get; set; }

        // Foreign key to AppUser
        public required string AuthUserId { get; set; }
        // Navigation property
        [ForeignKey(nameof(AuthUserId))]
        public virtual AppUser AppUser { get; set; }

        public string RegressionType { get; set; }
        public int NumberOfLeaves { get; set; }
        public int MinimumExampleCountPerLeaf { get; set; }
        public double LearningRate { get; set; }
        public int NumberOfTrees { get; set; }
        public double? MeanAbsoluteError { get; set; }
        public double? MeanSquaredError { get; set; }
        public double? RootMeanSquaredError { get; set; }
        public double? LossFunction { get; set; }
        public double? RSquared { get; set; }

    }
}
