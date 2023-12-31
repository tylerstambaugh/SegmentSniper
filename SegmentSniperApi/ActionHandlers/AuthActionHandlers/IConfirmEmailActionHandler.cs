using SegmentSniper.Models.Models.Auth;
using SegmentSniper.Models.Models.Auth.User;

namespace SegmentSniper.Api.ActionHandlers.AuthActionHandlers
{
    public interface IConfirmEmailActionHandler
    {
        Task<ConfirmEmailRequest.Response> HandleAsync(ConfirmEmailRequest request);
    }

    public class ConfirmEmailRequest
    {
        public string? UserId { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public string ConfirmationToken { get; set; }
        public class Response
        {
            public bool Success { get; set; }
            public SegmentSniperTokenData TokenData { get; set; }
            public UserDto UserData { get; set; }
        }
    }
}
