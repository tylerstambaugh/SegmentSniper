namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaApiToken
{
    public interface IAddUserActionHandler
    {
        Task<AddUserRequest.Response> HandleAsync(AddUserRequest request);
    }

    public class AddUserRequest
    {
        public AddUserRequest(string userId, int stravaAthlete)
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