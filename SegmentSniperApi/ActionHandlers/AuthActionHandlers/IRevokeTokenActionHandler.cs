
namespace SegmentSniper.Api.ActionHandlers.AuthActionHandlers
{
    public interface IRevokeTokenActionHandler
    {
        Task<RevokeUserTokenRequest.Response> HandleRevokeSingleUserToken(RevokeUserTokenRequest request);
    }

    public class RevokeUserTokenRequest
    {
        public RevokeUserTokenRequest(string userId)
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

            public bool Success { get; set; }
        }
    }
}