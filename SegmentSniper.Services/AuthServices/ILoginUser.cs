using SegmentSniper.Models.Models.Auth.User;

namespace SegmentSniper.Services.AuthServices
{
    public interface ILoginUser
    {
        LoginUserContract.Result Execute(LoginUserContract contract);
    }
    public class LoginUserContract
    {
        public LoginUserContract(UserLogin userLogin)
        {
            userLogin = userLogin;
        }
        public UserLogin UserLogin { get; }
        public class Result
        {
            public UserDto LoggedInUser { get; set; }
        }
    }


}