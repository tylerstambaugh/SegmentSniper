using SegmentSniper.MachineLearning.DataModels;
using SegmentSniper.Services.Interface;

namespace SegmentSniper.Services.MachineLearning
{
    public interface ISaveSegmentPredictionModel: IExecutableServiceAsync<SaveSegmentPredictionModelContract, SaveSegmentPredictionModelContract.Result>
    {
        Task<SaveSegmentPredictionModelContract.Result> ExecuteAsync(SaveSegmentPredictionModelContract contract);
    }

    public class SaveSegmentPredictionModelContract
    {
        public SaveSegmentPredictionModelContract(SegmentPredictionTrainingData segmentPredictionTrainingData)
        {
            SegmentPredictionTrainingData = segmentPredictionTrainingData;
        }

        public SegmentPredictionTrainingData SegmentPredictionTrainingData { get; set; }

        public class Result
        {
            public bool Success { get; set; }
        }
    }
}