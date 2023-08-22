

using SegmentSniper.Models.Models.Auth;

namespace SegmentSniper.Api.ActionHandlers.AuthActionHandlers
{
    public interface IRefreshTokenActionHandler
    {
        Task<RefreshTokenRequest.Response> Handle(RefreshTokenRequest request);
    }

    public class RefreshTokenRequest
    {
        public RefreshTokenRequest(TokenModel token)
        {
            Token = token;
        }
        public TokenModel Token { get; set; }

        public class Response
        {
            public Response(TokenModel refreshedToken)
            {
                RefreshedToken = refreshedToken;
            }
            public TokenModel RefreshedToken { get; set; }
        }
    }
}