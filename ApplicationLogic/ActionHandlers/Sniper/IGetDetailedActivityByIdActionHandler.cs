using SegmentSniper.Models.Models.Strava.Activity;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.Sniper
{
    public interface IGetDetailedActivityByIdActionHandler
    {
        Task<GetDetailedActivityByIdRequest.Response> HandleAsync(GetDetailedActivityByIdRequest request);
    }

    public class GetDetailedActivityByIdRequest
    {
        public GetDetailedActivityByIdRequest(string userId, string activityId)
        {
            UserId = userId;
            ActivityId = activityId;
        }

        public string UserId { get; set; }
        public string ActivityId { get; set; }  
        public class Response
        {
            public DetailedActivity DetailedActivity { get; set; }
        }
    }
}