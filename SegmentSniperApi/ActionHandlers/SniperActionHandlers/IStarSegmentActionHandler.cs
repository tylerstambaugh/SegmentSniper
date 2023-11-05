using SegmentSniper.Models.Models.Strava.Segment;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public interface IStarSegmentActionHandler
    {
        Task<StarSegmentRequest.Response> HandleAsync(StarSegmentRequest request);
    }

    public class StarSegmentRequest
    {

        public string UserId { get; set; }
        public string SegmentId { get; set; }
        public bool Star { get; set; }

        public class Response
        {
            public Response(DetailedSegment detailedSegment)
            {
                DetailedSegment = detailedSegment;
            }

            public DetailedSegment DetailedSegment { get; set; }
        }
    }

}