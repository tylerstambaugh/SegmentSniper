using Microsoft.AspNetCore.Http.HttpResults;
using SegmentSniper.Data;
using SegmentSniper.Models.Models.User;
using SegmentSniper.Services.AuthServices;

namespace SegmentSniper.Api.ActionHandlers.AuthActionHandlers
{
    public class RegisterUserActionHandler : IRegisterUserActionHandler
    {
        private readonly ISegmentSniperDbContext _context;
        private readonly IRegisterUser _registerUserService;

        public RegisterUserActionHandler(ISegmentSniperDbContext context, IRegisterUser registerUserService)
        {
            _context = context;
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

            return user;
        }

        private void ValidateRequest(RegisterUserRequest request)
        {
            throw new NotImplementedException();
        }

    }
}
