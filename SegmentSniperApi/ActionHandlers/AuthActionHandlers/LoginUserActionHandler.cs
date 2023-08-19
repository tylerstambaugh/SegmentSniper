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
        private readonly ILoginUser _authenticateUserService;
        private readonly ICreateToken _createTokenService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;

        public LoginUserActionHandler(ILoginUser authenticateUserService, ICreateToken createTokenService, UserManager<ApplicationUser> userManager, IConfiguration configuration)
        {
            _authenticateUserService = authenticateUserService;
            _createTokenService = createTokenService;
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<LoginUserRequest.Response> Handle(LoginUserRequest request)
        {
            var user = await _userManager.FindByNameAsync(request.UserLogin.UserName);
            if (user != null && await _userManager.CheckPasswordAsync(user, request.UserLogin.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var token = _createTokenService.Execute(authClaims);
                var refreshToken = GenerateRefreshToken();

                _ = int.TryParse(_configuration["JWT:RefreshTokenValidityInDays"], out int refreshTokenValidityInDays);

                user.RefreshToken = refreshToken;
                user.RefreshTokenExpiryTime = DateTime.Now.AddDays(refreshTokenValidityInDays);

                await _userManager.UpdateAsync(user);

                return new TokenModel
                {
                    Token = new JwtSecurityTokenHandler().WriteToken(token),
                    RefreshToken = refreshToken,
                    Expiration = token.ValidTo
                };
            }
            return Unauthorized();
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
