using SegmentSniper.MachineLearning.DataModels;

namespace SegmentSniper.Services.MachineLearning
{
    public interface IGetSegmentPredictionTrainingData
    {
        Task<GetSegmentPredictionTrainingDataContract.Result> ExecuteAsync(GetSegmentPredictionTrainingDataContract contract);
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
            public List<ML_SegmentDataRecord> mL_SegmentDataRecords { get; set; }
        }

    }
}