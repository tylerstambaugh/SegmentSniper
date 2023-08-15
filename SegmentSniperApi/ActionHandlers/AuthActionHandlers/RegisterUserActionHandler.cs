using SegmentSniper.Models.Models.User;
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
                UserName = request.User.UserName,
                Email = request.User.Email,
                FirstName = request.User.FirstName,
                LastName = request.User.LastName,
                Password = request.User.Password,
            });


            var user = await _registerUserService.ExecuteAsync(contract);

            return user.RegisteredUser;
        }

        private void ValidateRequest(RegisterUserRequest request)
        {
            
        }

    }
}
