using SegmentSniper.Models.UIModels.Segment;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public interface IGetSummarySegmentsByActivityIdActionHandler
    {
        Task<GetSummarySegmentsByActivityIdRequest.Response> Handle(GetSummarySegmentsByActivityIdRequest request);
    }

    public class GetSummarySegmentsByActivityIdRequest
    {
        public GetSummarySegmentsByActivityIdRequest(string activityId, string userId)
        {
            ActivityId = activityId;
            UserId = userId;
        }

        public string ActivityId { get; set;}
        public string UserId { get; set;}

        public class Response
        {
            public List<SummarySegmentListItem> SummarySegments { get; set; }
        }
    }
}