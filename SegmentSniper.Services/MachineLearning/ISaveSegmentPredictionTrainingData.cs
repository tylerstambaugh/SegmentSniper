using SegmentSniper.Data.Entities.Segments;
using SegmentSniper.Services.Interface;

namespace SegmentSniper.Services.MachineLearning
{
    public interface ISaveSegmentPredictionTrainingData: IExecutableServiceAsync<SaveSegmentPredictionTrainingDataContract, SaveSegmentPredictionTrainingDataContract.Result>
    {
        Task<SaveSegmentPredictionTrainingDataContract.Result> ExecuteAsync(SaveSegmentPredictionTrainingDataContract contract);
    }

    public class SaveSegmentPredictionTrainingDataContract
    {
        public SaveSegmentPredictionTrainingDataContract(List<ML_SegmentEffort> mlSegmentEfforts)
        {
            MlSegmentEfforts = mlSegmentEfforts;
        }

        public List<ML_SegmentEffort> MlSegmentEfforts { get; set; }
        public class Result
        {
            public bool Success { get; set; }
        }
    }
}