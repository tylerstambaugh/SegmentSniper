using SegmentSniper.Models.Models.Auth;
using SegmentSniper.Models.Models.Auth.User;

namespace SegmentSniper.Api.ActionHandlers.LoginActionHandlers
{
    public interface ILoginUserActionHandler

    {
        LoginUserRequest.Response Handle(LoginUserRequest contract);
    }

    public class LoginUserRequest
    {
        public LoginUserRequest(UserLogin userLogin)
        {
            UserLogin = userLogin;
        }
        public UserLogin UserLogin { get; set; }
        public class Response
        {
            public UserDto? User { get; set; }
            public TokenModel TokenData { get; set; }
        }
    }
}