using SegmentSniper.Models.UIModels.Segment;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public interface ISnipeSegmentsActionHandler
    {
        Task<SnipeSegmentsRequest.Response> Handle(SnipeSegmentsRequest request);
    }

    public class SnipeSegmentsRequest
    {
        public SnipeSegmentsRequest()
        {

        }
        public string UserId { get; set; }
        public string ActivityId { get; set; }
        public int? SecondsFromKom { get; set; }
        public int? PercentageFromKom { get; set; }
        public bool UseQom { get; set; }

        public class Response
        {
            public Response(List<SnipedSegment> snipedSegments)
            {
                SnipedSegments = snipedSegments;
            }

            public List<SnipedSegment> SnipedSegments { get; set; }
        }
    }
}