

using SegmentSniper.Models.Models.Auth;

namespace SegmentSniper.Api.ActionHandlers.AuthActionHandlers
{
    public interface IRefreshTokenActionHandler
    {
        Task<RefreshTokenRequest.Response> HandleAsync(RefreshTokenRequest request);
    }

    public class RefreshTokenRequest
    {
        public RefreshTokenRequest(RefreshTokenData refreshTokenData)
        {
            RefreshTokenData = refreshTokenData;
        }
        public RefreshTokenData RefreshTokenData { get; set; }

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