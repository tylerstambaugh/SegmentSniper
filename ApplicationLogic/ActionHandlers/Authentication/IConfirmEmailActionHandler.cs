using SegmentSniper.Models.Models.Auth;
using SegmentSniper.Models.Models.Auth.User;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.Authentication
{
    public interface IConfirmEmailActionHandler
    {
        Task<ConfirmEmailRequest.Response> HandleAsync(ConfirmEmailRequest request);
    }

    public class ConfirmEmailRequest
    {
        public required string UserId { get; set; }
        public required string AccessToken { get; set; }
        public required string RefreshToken { get; set; }
        public required string ConfirmationToken { get; set; }
        public class Response
        {
            public bool Success { get; set; }            
            public required UserDto UserData { get; set; }
        }
    }
}
