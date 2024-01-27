using SegmentSniper.Models.UIModels.Activity;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public interface IGetActivityListByNameActionHandler
    {
        Task<GetActivityListByNameRequest.Response> HandleAsync(GetActivityListByNameRequest request);
    }

    public class GetActivityListByNameRequest
    {
        public GetActivityListByNameRequest(string userId, string activityName, string? activityType)
        {
            UserId = userId;
            ActivityType = activityType;
            ActivityName = activityName;
        }

        public string? UserId { get; set; }
        public string ActivityName { get; set; }
        public string? ActivityType { get; }
        public class Response
        {
            public List<ActivityListModel> ActivityList { get; set; }
        }
    }
}