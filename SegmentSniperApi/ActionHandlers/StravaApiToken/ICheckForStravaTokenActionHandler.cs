namespace SegmentSniper.Api.ActionHandlers.StravaApiToken
{
    public interface ICheckForStravaTokenActionHandler
    {
        CheckForStravaTokenRequest.Response Handle(CheckForStravaTokenRequest request);

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