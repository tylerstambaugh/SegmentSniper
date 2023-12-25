
namespace SegmentSniper.Api.ActionHandlers.AuthActionHandlers
{
    public interface IRevokeTokenActionHandler
    {
        Task<RevokeUserTokenRequest.Response> HandleRevokeSingleUserToken(RevokeUserTokenRequest request);
    }

    public class RevokeUserTokenRequest
    {
        public RevokeUserTokenRequest(string userName)
        {
            UserName = userName;
        }

        public string UserName { get; }
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