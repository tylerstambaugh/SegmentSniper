using SegmentSniper.Models.UIModels.Segment;
using System.Text.Json.Serialization;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.SegmentPrediction
{
    public interface ISegmentPredictionActionHandler
    {
        Task<SegmentPredictionRequest.Response> HandleAsync(SegmentPredictionRequest request);
    }

    public class SegmentPredictionRequest
    {

        [JsonConstructor]
        public SegmentPredictionRequest(string segmentId)
        {
            SegmentId = segmentId;
        }

        public SegmentPredictionRequest(string? userId, string segmentId) : this(segmentId)
        {
            UserId = userId;
        }

        public string? UserId { get; }

        public string SegmentId { get; set; }
        public class Response
        {
            public int PredictedTime { get; set; }
            public DetailedSegmentUIModel DetailedSegmentUIModel { get; set; }
        }
    }
}
