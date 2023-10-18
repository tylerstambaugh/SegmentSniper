using SegmentSniper.Models.Models.Strava.Activity;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public interface IGetDetailedActivityByIdActionHandler
    {
        Task<GetDetailedActivityByIdRequest.Response> Handle(GetDetailedActivityByIdRequest request);
    }

    public class GetDetailedActivityByIdRequest
    {
        public string UserId { get; set; }
        public string ActivityId { get; set; }  
        public class Response
        {
            public DetailedActivity DetailedActivity { get; set; }
        }
    }
}