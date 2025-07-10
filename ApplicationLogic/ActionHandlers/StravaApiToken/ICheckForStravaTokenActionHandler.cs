namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaApiToken
{
    public interface ICheckForStravaTokenActionHandler
    {
       Task<CheckForStravaTokenRequest.Response> HandleAsync(CheckForStravaTokenRequest request);
    }

    public class CheckForStravaTokenRequest
    {
        public CheckForStravaTokenRequest(string userId)
        {
            UserId = userId;
        }
        public string UserId { get; set; }

        public class Response
        {
            public bool hasStravaToken { get; set; }
        }
    }
}