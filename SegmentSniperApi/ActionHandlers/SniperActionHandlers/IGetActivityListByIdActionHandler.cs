using SegmentSniper.Models.Models.Strava.Activity;
using SegmentSniper.Models.UIModels.Activity;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public interface IGetActivityListByIdActionHandler
    {
        Task<GetActivityListByIdRequest.Response> HandleAsync(GetActivityListByIdRequest request);
    }

    public class GetActivityListByIdRequest
    {
        public GetActivityListByIdRequest(string userId, string activityId)
        {
            UserId = userId;
            ActivityId = activityId;
        }
        public string UserId { get; }
        public string? ActivityId { get; }
        public class Response
        {
            public List<ActivityListModel> ActivityList { get; set; }
        }
    }
}