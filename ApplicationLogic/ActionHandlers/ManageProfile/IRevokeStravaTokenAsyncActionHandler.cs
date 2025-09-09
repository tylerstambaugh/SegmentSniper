
namespace SegmentSniper.ApplicationLogic.ActionHandlers.ManageProfile
{
    public interface IRevokeStravaTokenAsyncActionHandler
    {
        Task<RevokeStravaTokenAsyncActionHandlerRequest.Response> HandleAsync(RevokeStravaTokenAsyncActionHandlerRequest request);
    }

    public class RevokeStravaTokenAsyncActionHandlerRequest
    {
        public RevokeStravaTokenAsyncActionHandlerRequest(string userId)
        {
            UserId = userId;
        }

        public string UserId { get; }
        public class Response
        {
            public Response(bool success)
            {
                Success = success;
            }

            public bool Success { get; }
        }
    }
}