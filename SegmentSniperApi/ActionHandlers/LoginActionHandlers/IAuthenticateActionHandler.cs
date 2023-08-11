using SegmentSniper.Api.Models.User;

namespace SegmentSniper.Api.ActionHandlers.LoginActionHandlers
{
    public interface IAuthenticateActionHandler
    {
        AuthenticateUserLoginContract.Result Execute(AuthenticateUserLoginContract contract);
    }

    public class AuthenticateUserLoginContract
    {
        public AuthenticateUserLoginContract(UserLogin userLogin)
        {
            UserLogin = userLogin;
        }
        public UserLogin UserLogin { get; set; }
        public class Result
        {
            public User? User { get; set; }
        }
    }
}