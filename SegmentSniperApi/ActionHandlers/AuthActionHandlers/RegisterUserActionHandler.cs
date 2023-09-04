using SegmentSniper.Models.Models.Auth.User;
using SegmentSniper.Services.AuthServices;

namespace SegmentSniper.Api.ActionHandlers.AuthActionHandlers
{
    public class RegisterUserActionHandler : IRegisterUserActionHandler
    {
        private readonly IRegisterUser _registerUserService;

        public RegisterUserActionHandler(IRegisterUser registerUserService)
        {
            _registerUserService = registerUserService;
        }

        public async Task<UserDto> Handle(RegisterUserRequest request)
        {
            ValidateRequest(request);

            var contract = new RegisterUserContract(new RegisterUserDto
            {
                Email = request.User.Email,
                FirstName = request.User.FirstName,
                Password = request.User.Password,
            });

            var user = await _registerUserService.ExecuteAsync(contract);

            return user.RegisteredUser;
        }

        private void ValidateRequest(RegisterUserRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }
        }

    }
}
