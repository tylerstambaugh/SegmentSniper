using SegmentSniper.Models.Models.User;

namespace SegmentSniper.Services.AuthServices
{
    public interface IAuthenticateUser
    {
        AuthenticateUserContract.Result Execute(AuthenticateUserContract contract);
    }
    public class AuthenticateUserContract
    {
        public AuthenticateUserContract(UserLogin userLogin)
        {
            userLogin = userLogin;
        }
        public UserLogin UserLogin { get; }
        public class Result
        {
            public UserDto AuthenticatedUser { get; set; }
        }
    }


}