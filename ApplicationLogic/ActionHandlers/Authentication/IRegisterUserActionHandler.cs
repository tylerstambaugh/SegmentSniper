using SegmentSniper.Models.Models.Auth.User;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.Authentication
{
    public interface IRegisterUserActionHandler
    {
        Task<UserDto> HandleAsync(RegisterUserRequest contract);
    }

    public class RegisterUserRequest
    {
        public RegisterUserDto User { get; set; }

        public class Response
        {
            public UserDto RegisteredUser { get; set; }
        }
    }
}