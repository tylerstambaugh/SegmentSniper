using SegmentSniper.Models.Models.User;

namespace SegmentSniper.Api.ActionHandlers.LoginActionHandlers
{
    public interface IAuthenticateActionHandler
    {
        AuthenticateUserLoginRequest.Response Handle(AuthenticateUserLoginRequest contract);
    }

    public class AuthenticateUserLoginRequest
    {
        public AuthenticateUserLoginRequest(UserLogin userLogin)
        {
            UserLogin = userLogin;
        }
        public UserLogin UserLogin { get; set; }
        public class Response
        {
            public UserDto? User { get; set; }
        }
    }
}