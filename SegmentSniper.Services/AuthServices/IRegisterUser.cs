using SegmentSniper.Models.Models.User;

namespace SegmentSniper.Services.AuthServices
{
    public interface IRegisterUser
    {
        void Execute(RegisterUserContract contract);
    }

    public class RegisterUserContract
    {
        public RegisterUserDto RegisterUser { get; set; }
        public class Result
        {
            public UserDto RegisteredUser { get; set; }
        }
    }
}