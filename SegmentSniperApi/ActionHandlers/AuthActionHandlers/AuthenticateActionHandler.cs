using SegmentSniper.Models.Models.User;
using SegmentSniper.Services.AuthServices;

namespace SegmentSniper.Api.ActionHandlers.LoginActionHandlers
{
    public class AuthenticateActionHandler : IAuthenticateActionHandler
    {
        private readonly IAuthenticateUser _authenticateUserService;

        public AuthenticateActionHandler(IAuthenticateUser authenticateUserService)
        {
            _authenticateUserService = authenticateUserService;
        }

        public AuthenticateUserLoginRequest.Response Handle(AuthenticateUserLoginRequest contract)
        {
            var response = new AuthenticateUserLoginRequest.Response();
            var result = _authenticateUserService.Execute(new AuthenticateUserContract(contract.UserLogin));

            if (result.AuthenticatedUser != null)
            {
                response.User = new UserDto(result.AuthenticatedUser.Email, result.AuthenticatedUser.FirstName, result.AuthenticatedUser.Id);
            }

            return response;
        }
    }
}
