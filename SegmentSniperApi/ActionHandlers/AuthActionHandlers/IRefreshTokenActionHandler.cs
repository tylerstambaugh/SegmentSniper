

using SegmentSniper.Models.Models.Auth;

namespace SegmentSniper.Api.ActionHandlers.AuthActionHandlers
{
    public interface IRefreshTokenActionHandler
    {
        Task<RefreshTokenRequest.Response> Handle(RefreshTokenRequest request);
    }

    public class RefreshTokenRequest
    {
        public TokenModel Token { get; set; }

        public class Response
        {

        }
    }
}