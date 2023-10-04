using SegmentSniper.Models.Models.Strava.Activity;
using static SegmentSniper.Data.Enums.ActivityTypeEnum;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public interface IGetSummaryActivityForTimeRangeActionHandler
    {
        Task<GetSummaryActivityForTimeRangeRequest.Response> Handle(GetSummaryActivityForTimeRangeRequest request);
    }

    public class GetSummaryActivityForTimeRangeRequest
    {
        public GetSummaryActivityForTimeRangeRequest(string userId, string activityId, DateTime startDate, DateTime endDate, string activityType)
        {
            UserId = userId;
            ActivityId = activityId;
            StartDate = startDate;
            EndDate = endDate;
            ActivityType = activityType;
        }
        public string UserId { get; set; }
        public string? ActivityId { get; set; }

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? ActivityType { get; set;  }

        public class Response
        {
            public List<SummaryActivityModel> SummaryActivities { get; set; }
        }
    }
}