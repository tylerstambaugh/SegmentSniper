namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaApiToken
{
    public interface IAddStravaAthleteActionHandler
    {
        Task<AddStravaAthleteRequest.Response> HandleAsync(AddStravaAthleteRequest request);
    }

    public class AddStravaAthleteRequest
    {
        public AddStravaAthleteRequest(string userId, int stravaAthlete)
        {
            UserId = userId;
            StravaAthlete = stravaAthlete;
        }
        public string UserId { get; }
        public int StravaAthlete { get; }
        public class Response
        {
        }
    }
}