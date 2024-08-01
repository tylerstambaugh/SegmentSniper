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
            public Response(bool success)
            {
                Success = success;
            }

            public bool Success { get; set; }
        }
    }
}