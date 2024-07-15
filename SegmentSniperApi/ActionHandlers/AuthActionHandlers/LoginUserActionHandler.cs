using IdentityModel;
using Microsoft.AspNetCore.Identity;
using SegmentSniper.Data.Entities.Auth;
using SegmentSniper.Models.Models.Auth;
using SegmentSniper.Models.Models.Auth.User;
using SegmentSniper.Services.AuthServices;
using SegmentSniper.Services.AuthServices.Token;
using SegmentSniper.Services.StravaToken;
using System.IdentityModel.Tokens.Jwt;

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
        private readonly IGetStravaTokenForUser _getStravaTokenForUser;


        public LoginUserActionHandler(IAuthenticateUser authenticateUserService,
            ICreateToken createTokenService,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration,
            IGenerateRefreshToken generateRefreshToken,
            IGetUserRoles getUserRoles,
            IGetStravaTokenForUser getStravaTokenForUser)
        {
            _authenticateUserService = authenticateUserService;
            _createToken = createTokenService;
            _userManager = userManager;
            _configuration = configuration;
            _generateRefreshToken = generateRefreshToken;
            _getUserRoles = getUserRoles;
            _getStravaTokenForUser = getStravaTokenForUser;
        }

        public async Task<LoginUserRequest.Response> Handle(LoginUserRequest request)
        {
            ValidateRequest(request);
            try
            {
                var user = await _authenticateUserService.ExecuteAsync(new AuthenticateUserContract(request.UserLogin));

                //need to check if user.LoggedInUser is null and handle
                if (user == null)
                {
                    return new LoginUserRequest.Response
                    {
                        ErrorMessage = "User not found"
                    };
                }
                var authenticatedUser = user.LoggedInUser;
                if (authenticatedUser != null)
                {
                    var authClaims = _getUserRoles.Execute(new GetUserRolesContract(user.LoggedInUser)).Result.Roles;

                    var token = _createToken.Execute(new CreateTokenContract(authClaims));

                    var refreshToken = _generateRefreshToken.Execute();

                    _ = int.TryParse(_configuration["JWT:RefreshTokenValidityInDays"], out int refreshTokenValidityInDays);

                    // set the refresh token on the user in the db:
                    authenticatedUser.RefreshToken = refreshToken;
                    authenticatedUser.RefreshTokenExpiration = DateTime.Now.AddDays(refreshTokenValidityInDays);
                    authenticatedUser.LastLogin = DateTime.Now;

                    await _userManager.UpdateAsync(authenticatedUser);

                    var tokenModel = new SegmentSniperTokenData
                    {
                        AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
                        RefreshToken = refreshToken,
                        Expiration = token.ValidTo
                    };

                    var userStravaToken = _getStravaTokenForUser.Execute(new GetStravaTokenForUserContract(authenticatedUser.Id)).StravaToken;

                    var hasStravaTokenData = userStravaToken != null && userStravaToken.ExpiresAt < DateTime.Now.ToEpochTime();

                    var userDto = new UserDto
                    {
                        Id = authenticatedUser.Id,
                        FirstName = authenticatedUser.FirstName,
                        Email = authenticatedUser.Email,
                        HasStravaTokenData = hasStravaTokenData,
                        VerifiedEmail = authenticatedUser.EmailConfirmed,
                        Roles = user.Roles,
                    };

                    return new LoginUserRequest.Response
                    {
                        UserData = userDto,
                        TokenData = tokenModel
                    };
                }
                else
                {
                    throw new ApplicationException("Unable to login user");
                }
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Unable to login user", ex);
            }
        }

        private void ValidateRequest(LoginUserRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }
            if (request.UserLogin == null)
            {
                throw new ArgumentNullException(nameof(request.UserLogin));
            }
            if (string.IsNullOrWhiteSpace(request.UserLogin.UserName))
            {
                throw new ArgumentException(nameof(request.UserLogin.UserName));
            }
            if (string.IsNullOrWhiteSpace(request.UserLogin.Password))
            {
                throw new ArgumentException(nameof(request.UserLogin.Password));
            }
        }
    }
}
