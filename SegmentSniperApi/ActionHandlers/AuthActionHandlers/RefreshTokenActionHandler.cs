

using IdentityModel;
using SegmentSniper.Services.AuthServices;
using static SegmentSniper.Services.AuthServices.IRefreshToken;

namespace SegmentSniper.Api.ActionHandlers.AuthActionHandlers
{
    public class RefreshTokenActionHandler : IRefreshTokenActionHandler
    {
        private readonly IRefreshToken _refreshToken;

        public RefreshTokenActionHandler(IRefreshToken refreshToken)
        {
            _refreshToken = refreshToken;
        }

        public async Task<RefreshTokenRequest.Response> Handle(RefreshTokenRequest request)
        {
            var refreshedToken = await _refreshToken.Execute(new RefreshTokenContract(request.RefreshTokenData));
            if(refreshedToken == null)
            {
                return new RefreshTokenRequest.Response(refreshedToken.RefreshedToken);
            }
            else
            {
                throw new ApplicationException($"Invalid access or refresh token {nameof(request)}");
            }
        }
    }
}
