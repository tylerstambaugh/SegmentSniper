using SegmentSniper.Models.MachineLearning;
using SegmentSniper.Services.Interface;

namespace SegmentSniper.Services.MachineLearning
{
    public interface IGetSegmentPredictionTrainingData : IExecutableServiceAsync<GetSegmentPredictionTrainingDataContract, GetSegmentPredictionTrainingDataContract.Result>
    {
        Task<GetSegmentPredictionTrainingDataContract.Result> ExecuteAsync(GetSegmentPredictionTrainingDataContract contract);
        Task<int> GetCountOfTrainingRecords(string userId);
    }

    public class GetSegmentPredictionTrainingDataContract
    {
        public GetSegmentPredictionTrainingDataContract(string userId)
        {
            UserId = userId;
        }

        public string UserId { get; set; }
        public class Result
        {
            public List<ML_SegmentDataRecord> ML_SegmentDataRecords { get; set; }
        }

    }
}