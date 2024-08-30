using SegmentSniper.Models.MachineLearning;
using SegmentSniper.Services.Interface;

namespace SegmentSniper.Services.MachineLearning
{
    public interface ISaveSegmentPredictionModel : IExecutableServiceAsync<SaveSegmentPredictionModelContract, SaveSegmentPredictionModelContract.Result>
    {
        Task<SaveSegmentPredictionModelContract.Result> ExecuteAsync(SaveSegmentPredictionModelContract contract);
    }

    public class SaveSegmentPredictionModelContract
    {
        public SaveSegmentPredictionModelContract(SegmentPredictionTrainedData segmentPredictionTrainingData)
        {
            SegmentPredictionTrainingData = segmentPredictionTrainingData;
        }

        public SegmentPredictionTrainedData SegmentPredictionTrainingData { get; set; }

        public class Result
        {
            public bool Success { get; set; }
        }
    }
}