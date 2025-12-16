namespace SegmentSniper.ApplicationLogic.ActionHandlers.User
{
    public interface IDeleteAppUserActionHandler
    {
        Task<DeleteAppUserRequest.Response> HandleAsync(DeleteAppUserRequest request);
    }

    public class DeleteAppUserRequest
    {
        public DeleteAppUserRequest(string userId)
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