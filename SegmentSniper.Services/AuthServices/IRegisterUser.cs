using SegmentSniper.Models.Models.User;

namespace SegmentSniper.Services.AuthServices
{
    public interface IRegisterUser
    {
        Task<UserDto> ExecuteAsync(RegisterUserContract contract);
    }

    public class RegisterUserContract
    {
        public RegisterUserContract(RegisterUserDto registerUser)
        {
            RegisterUser = registerUser;
        }
        public RegisterUserDto RegisterUser { get; }
        public class Result
        {
            public UserDto RegisteredUser { get; set; }
        }
    }
}