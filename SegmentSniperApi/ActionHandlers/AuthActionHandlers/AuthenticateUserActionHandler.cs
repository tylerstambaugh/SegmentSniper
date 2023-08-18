using SegmentSniper.Models.Models.User;
using SegmentSniper.Services.AuthServices;

namespace SegmentSniper.Api.ActionHandlers.LoginActionHandlers
{
    public class AuthenticateUserActionHandler : IAuthenticateUserActionHandler
    {
        private readonly IAuthenticateUser _authenticateUserService;

        public AuthenticateUserActionHandler(IAuthenticateUser authenticateUserService)
        {
            _authenticateUserService = authenticateUserService;
        }

        public AuthenticateUserLoginRequest.Response Handle(AuthenticateUserLoginRequest request)
        {
            var response = new AuthenticateUserLoginRequest.Response();
            var result = _authenticateUserService.Execute(new AuthenticateUserContract(request.UserLogin));

            if (result.AuthenticatedUser != null)
            {
                response.User = new UserDto(result.AuthenticatedUser.Id, result.AuthenticatedUser.Email, result.AuthenticatedUser.FirstName, result.AuthenticatedUser.Id);
            }

            return response;
        }

        private void ValidateRequest(AuthenticateUserLoginRequest request)
        {
            if(request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }
        }
    }
}
