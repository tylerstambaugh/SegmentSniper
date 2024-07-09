namespace SegmentSniper.Api.ActionHandlers.SegmentPredictionActionHandlers
{
    public interface ISegmentPredictionActionHandler
    {
        Task<SegmentPredictionRequest.Response> HandleAsync(SegmentPredictionRequest request);
    }

    public class SegmentPredictionRequest
    {
        public SegmentPredictionRequest(string segmentId)
        {
            SegmentId = segmentId;
        }

        public SegmentPredictionRequest(string? userId, string segmentId) : this(userId)
        {
            SegmentId = segmentId;
        }

        public string? UserId { get; }

        public string SegmentId { get; set; }
        public class Response
        {
            public int PredictedTime { get; set; }
        }
    }
}
