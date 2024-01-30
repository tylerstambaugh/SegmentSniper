using SegmentSniper.Models.UIModels.Activity;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public interface IGetActivityListActionHandler
    {
        Task<GetActivityListRequest.Response> HandleAsync(GetActivityListRequest request);
    }

    public class GetActivityListRequest
    {
        public GetActivityListRequest(string userId, DateTime startDate, DateTime endDate, string activityType, string activityName)
        {
            UserId = userId;
            StartDate = startDate;
            EndDate = endDate;
            ActivityType = activityType;
            ActivityName = activityName;
        }
        public string UserId { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? ActivityType { get; }
        public string ActivityName { get; }

        public class Response
        {
            public List<ActivityListModel> ActivityList { get; set; }
        }
    }
}