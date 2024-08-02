using SegmentSniper.Models.UIModels.MachineLearning;

namespace SegmentSniper.Api.ActionHandlers.SegmentPredictionActionHandlers
{
    public interface ITrainSegmentPredictionModelActionHandler
    {
        Task<TrainModelRequest.Response> HandleAsync(TrainModelRequest request);
    }

    public class TrainModelRequest
    {
        public TrainModelRequest(string userId)
        {
            UserId = userId;
        }

        public string UserId { get; set; }
        public class Response
        {
            public Response(SegmentPredictionTrainingDataUiModel segmentPredictionTrainingDataUiModel)
            {
                SegmentPredictionTrainingDataUiModel = segmentPredictionTrainingDataUiModel;
            }

            public SegmentPredictionTrainingDataUiModel SegmentPredictionTrainingDataUiModel { get; set; }
        }
    }
}