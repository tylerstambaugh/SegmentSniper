using SegmentSniper.Models.Models.Strava.Activity;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public interface IGetSummaryActivityByIdActionHandler
    {
        Task<GetSummaryActivityByIdRequest.Response> Handle(GetSummaryActivityByIdRequest request);
    }

    public class GetSummaryActivityByIdRequest
    {
        public GetSummaryActivityByIdRequest(string userId, string activityId)
        {
            UserId = userId;
            ActivityId = activityId;
        }
        public string UserId { get; }
        public string? ActivityId { get; }
        public class Response
        {
            public List<SummaryActivity> SummaryActivities { get; set; }
        }
    }
}