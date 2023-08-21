using Microsoft.AspNetCore.Identity;
using SegmentSniper.Data.Entities.Auth;
using SegmentSniper.Models.Models.Auth;
using SegmentSniper.Models.Models.Auth.User;
using SegmentSniper.Services.AuthServices;
using SegmentSniper.Services.AuthServices.Token;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace SegmentSniper.Api.ActionHandlers.LoginActionHandlers
{
    public class LoginUserActionHandler : ILoginUserActionHandler
    {
        private readonly IAuthenticateUser _authenticateUserService;
        private readonly ICreateToken _createToken;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly IGenerateRefreshToken _generateRefreshToken;
        private readonly IGetUserRoles _getUserRoles;

        public LoginUserActionHandler(IAuthenticateUser authenticateUserService, ICreateToken createTokenService, UserManager<ApplicationUser> userManager, IConfiguration configuration, IGenerateRefreshToken generateRefreshToken, IGetUserRoles getUserRoles)
        {
            _authenticateUserService = authenticateUserService;
            _createToken = createTokenService;
            _userManager = userManager;
            _configuration = configuration;
            _generateRefreshToken = generateRefreshToken;
            _getUserRoles = getUserRoles;
        }

        public async Task<LoginUserRequest.Response> Handle(LoginUserRequest request)
        {
            ValidateRequest(request);

            var user = await _authenticateUserService.Execute(new AuthenticateUserContract(request.UserLogin));
            var authenticatedUser = user.LoggedInUser;
            if (authenticatedUser != null)
            {
                var authClaims = _getUserRoles.Execute(new GetUserRolesContract(user.LoggedInUser)).Result.Roles;

                var token = _createToken.Execute(authClaims);

                var refreshToken = _generateRefreshToken.Execute();

                _ = int.TryParse(_configuration["JWT:RefreshTokenValidityInDays"], out int refreshTokenValidityInDays);

                authenticatedUser.RefreshToken = refreshToken;
                authenticatedUser.RefreshTokenExpiration = DateTime.Now.AddDays(refreshTokenValidityInDays);

                await _userManager.UpdateAsync(authenticatedUser);

                var tokenModel = new TokenModel
                {
                    AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
                    RefreshToken = refreshToken,
                    Expiration = token.ValidTo
                };

                var userDto = new UserDto(authenticatedUser.Id, authenticatedUser.UserName, authenticatedUser.FirstName, authenticatedUser.Email);

                return new LoginUserRequest.Response
                {
                    User = userDto,
                    TokenData = tokenModel
                };
            }
            else
            {
                throw new ApplicationException("Unable to login user");
            }
        }

        private void ValidateRequest(LoginUserRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }
        }
    }
}
