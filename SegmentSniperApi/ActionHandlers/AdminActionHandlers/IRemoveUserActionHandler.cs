namespace SegmentSniper.Api.ActionHandlers.AdminActionHandlers
{
    public interface IRemoveUserActionHandler
    {
        Task<RemoveUserRequest.Result> HandleAsync(RemoveUserRequest request);
    }

    public class RemoveUserRequest
    {
        public RemoveUserRequest(string userId)
        {
            UserId = userId;
        }

        public string UserId { get; set; }
        public class Result
        {
            public bool Success { get; set; }
        }
    }
}