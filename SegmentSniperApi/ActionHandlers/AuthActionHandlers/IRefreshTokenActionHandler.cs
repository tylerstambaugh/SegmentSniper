

using SegmentSniper.Models.Models.Auth;

namespace SegmentSniper.Api.ActionHandlers.AuthActionHandlers
{
    public interface IRefreshTokenActionHandler
    {
        Task<RefreshTokenRequest.Response> Handle(RefreshTokenRequest request);
    }

    public class RefreshTokenRequest
    {
        public RefreshTokenRequest(SegmentSniperTokenData token)
        {
            Token = token;
        }
        public SegmentSniperTokenData Token { get; set; }

        public class Response
        {
            public Response(SegmentSniperTokenData refreshedToken)
            {
                RefreshedToken = refreshedToken;
            }
            public SegmentSniperTokenData RefreshedToken { get; set; }
        }
    }
}