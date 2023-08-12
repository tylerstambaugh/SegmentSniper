using SegmentSniper.Models.Models.User;

namespace SegmentSniper.Api.ActionHandlers.AuthActionHandlers
{
    public interface IRegisterUserActionHandler
    {
        Task<UserDto> Handle(RegisterUserRequest contract);
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