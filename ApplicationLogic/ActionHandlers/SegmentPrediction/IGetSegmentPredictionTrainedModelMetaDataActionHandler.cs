using SegmentSniper.Models.UIModels.MachineLearning;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.SegmentPrediction
{
    public interface IGetSegmentPredictionTrainedModelMetaDataActionHandler
    {
        Task<GetSegmentPredictionTrainingModelActionHandlerRequest.Result> HandleAsync(GetSegmentPredictionTrainingModelActionHandlerRequest request);
    }

    public class GetSegmentPredictionTrainingModelActionHandlerRequest
    {
        public GetSegmentPredictionTrainingModelActionHandlerRequest(string userId)
        {
            UserId = userId;
        }

        public string UserId { get; set; }
        public class Result
        {
            public SegmentPredictionTrainingDataUiModel SegmentPredictionTrainingDataUiModel { get; set; }
        }
    }
}