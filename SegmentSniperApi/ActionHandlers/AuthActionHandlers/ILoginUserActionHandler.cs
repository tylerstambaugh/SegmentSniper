using SegmentSniper.Models.Models.Auth;
using SegmentSniper.Models.Models.Auth.User;

namespace SegmentSniper.Api.ActionHandlers.LoginActionHandlers
{
    public interface ILoginUserActionHandler

    {
        Task<LoginUserRequest.Response> Handle(LoginUserRequest request);
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