using Microsoft.ML;

namespace SegmentSniper.MachineLearning
{
    public class ModelTrainer
    {
        public ITransformer TrainModel(MLContext mlContext, IDataView trainData)
        {
            var pipeline = mlContext.Transforms.Concatenate("Features", new[] { "ElapsedTime", "SegmentPrTime", "Distance", "AverageSpeed", "MaximumSpeed", "ElevationGain", "AverageGrade", "MaximumGrade", "AverageHeartRate"  })
                .Append(mlContext.Regression.Trainers.Sdca(labelColumnName: "Time", featureColumnName: "Features"));

            var model = pipeline.Fit(trainData);

            return model;
        }
    }
}
