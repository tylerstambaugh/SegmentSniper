namespace SegmentSniper.ApplicationLogic.ActionHandlers.User
{
    public interface IAddAppUserActionHandler
    {
        Task<AddAppUserRequest.Response> HandleAsync(AddAppUserRequest request);
    }

    public class AddAppUserRequest
    {
        public AddAppUserRequest(string userId, int stravaAthlete)
        {
            UserId = userId;
            StravaAthlete = stravaAthlete;
        }
        public string UserId { get; }
        public int StravaAthlete { get; }
        public class Response
        {
            public Response(bool success, string message)
            {
                Success = success;
                Message = message;
            }
            public bool Success { get; }
            public string Message { get; }
        }
    }
}