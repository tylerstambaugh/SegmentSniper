using SegmentSniper.Services.AuthServices.Token;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.Authentication
{
    public class RevokeTokenActionHandler : IRevokeTokenActionHandler
    {
        private readonly IRevokeToken _revokeToken;

        public RevokeTokenActionHandler(IRevokeToken revokeToken)
        {
            _revokeToken = revokeToken;
        }
        public async Task<RevokeUserTokenRequest.Response> HandleRevokeSingleUserToken(RevokeUserTokenRequest request)
        {
            var result = await _revokeToken.ExecuteSingleUser(new RevokeTokenContract(request.UserId));

            return new RevokeUserTokenRequest.Response(result.Success);
        }

        public async Task<bool> HandleRevokeAllTokens()
        {
            return await _revokeToken.ExecuteAllUsers();
        }
    }
}
