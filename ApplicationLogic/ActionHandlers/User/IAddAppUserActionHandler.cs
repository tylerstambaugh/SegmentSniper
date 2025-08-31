namespace SegmentSniper.ApplicationLogic.ActionHandlers.User
{
    public interface IAddAppUserActionHandler
    {
        Task<AddAppUserRequest.Response> HandleAsync(AddAppUserRequest request);
    }

    public class AddAppUserRequest
    {
        public AddAppUserRequest(string userId)
        {
            UserId = userId;
        }
        public string UserId { get; }
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