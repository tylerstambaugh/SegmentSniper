using SegmentSniper.Models.Models.Strava.Activity;
using SegmentSniper.Models.UIModels.Activity;
using static SegmentSniper.Data.Enums.ActivityTypeEnum;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public interface IGetActivityListForTimeRangeActionHandler
    {
        Task<GetActivityListForTimeRangeRequest.Response> Handle(GetActivityListForTimeRangeRequest request);
    }

    public class GetActivityListForTimeRangeRequest
    {
        public GetActivityListForTimeRangeRequest(string userId,DateTime startDate, DateTime endDate, string activityType)
        {
            UserId = userId;
            StartDate = startDate;
            EndDate = endDate;
            ActivityType = activityType;
        }
        public string UserId { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? ActivityType { get; }

        public class Response
        {
            public List<ActivityListModel> ActivityList { get; set; }
        }
    }
}