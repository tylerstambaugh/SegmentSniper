using SegmentSniper.Models.UIModels.Activity;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public interface IGetActivityListByNameActionHandler
    {
        Task<GetActivityListByNameRequest.Response> Handle(GetActivityListByNameRequest request);
    }

    public class GetActivityListByNameRequest
    {
        public GetActivityListByNameRequest(string name, string userId, string? activityType)
        {
            Name = name;
            UserId = userId;
            ActivityType = activityType;
        }

        public string Name { get; set; }
        public string UserId { get; set; }
        public string? ActivityType { get; }
        public class Response
        {
            public List<ActivityListModel> ActivityList { get; set; }
        }
    }
}