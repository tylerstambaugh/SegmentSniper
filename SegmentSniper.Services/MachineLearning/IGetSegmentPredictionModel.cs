using SegmentSniper.Models.MachineLearning;
using SegmentSniper.Services.Interface;

namespace SegmentSniper.Services.MachineLearning
{
    public interface IGetSegmentPredictionModel : IExecutableServiceAsync<GetSegmentPredictionModelContract, GetSegmentPredictionModelContract.Result>
    {
        Task<GetSegmentPredictionModelContract.Result> ExecuteAsync(GetSegmentPredictionModelContract contract);
    }

    public class GetSegmentPredictionModelContract
    {
        public GetSegmentPredictionModelContract(string userId)
        {
            UserId = userId;
        }

        public string UserId { get; set; }

        public class Result
        {
            public SegmentPredictionTrainedData SegmentPredictionTrainingData { get; set; }
        }
    }
}