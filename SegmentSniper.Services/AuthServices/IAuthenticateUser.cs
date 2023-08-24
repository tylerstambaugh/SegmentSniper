using SegmentSniper.Data.Entities.Auth;
using SegmentSniper.Models.Models.Auth.User;

namespace SegmentSniper.Services.AuthServices
{
    public interface IAuthenticateUser
    {
        Task<AuthenticateUserContract.Result> ExecuteAsync(AuthenticateUserContract contract);
    }
    public class AuthenticateUserContract
    {
        public AuthenticateUserContract(UserLogin userLogin)
        {
            UserLogin = userLogin;
        }
        public UserLogin UserLogin { get; }
        public class Result
        {
            public ApplicationUser LoggedInUser { get; set; }
        }
    }


}