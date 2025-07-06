using SegmentSniper.Api.Controllers;
using SegmentSniper.Models.UIModels.Segment;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public interface IGetSnipeSegmentsByActivityIdActionHandler
    {
        Task<ApiResponse<GetSnipeSegmentsByActivityIdRequest.Response>> HandleAsync(GetSnipeSegmentsByActivityIdRequest request);
    }

    public class GetSnipeSegmentsByActivityIdRequest
    {
        public GetSnipeSegmentsByActivityIdRequest()
        {
            
        }
        public GetSnipeSegmentsByActivityIdRequest(string activityId, string userId)
        {
            ActivityId = activityId;
            UserId = userId;
        }

        public string ActivityId { get; set; }
        public string UserId { get; set; }
        public class Response
        {
            public Response(List<SnipeSegment> snipedSegments)
            {
                SnipedSegments = snipedSegments;
            }

            public List<SnipeSegment> SnipedSegments { get; set; }
        }
    }
}