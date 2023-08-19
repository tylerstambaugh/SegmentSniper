using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SegmentSniper.Api.ActionHandlers.AuthActionHandlers;
using SegmentSniper.Api.ActionHandlers.LoginActionHandlers;
using SegmentSniper.Models.Models.Auth;
using SegmentSniper.Models.Models.Auth.User;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace SegmentSniper.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ILoginUserActionHandler _loginUserActionHandler;
        private readonly IRegisterUserActionHandler _registerUserActionHandler;

        public AuthController(IConfiguration config, ILoginUserActionHandler loginUserActionHandler, IRegisterUserActionHandler registerUserActionHandler, )
        {
            _config = config;
            _loginUserActionHandler = loginUserActionHandler;
            _registerUserActionHandler = registerUserActionHandler;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register([FromBody] RegisterUserDto registerUser)
        {
            if (registerUser != null)
            {
                var registeredUser = await _registerUserActionHandler.Handle(new RegisterUserRequest { User = registerUser });
                if (registeredUser != null)
                {
                    return Ok(registeredUser);
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                return BadRequest();
            }
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLogin userLogin)
        {
            var authenticateUser = _loginUserActionHandler.Handle(new LoginUserRequest(userLogin));

            if (authenticateUser.User != null)
            {
                login
            }
            return NotFound("Username or password is incorrect");
        }

 

        [HttpPost]
        [Route("refresh-token")]
        public async Task<IActionResult> RefreshToken(TokenModel tokenModel)
        {
            throw new NotImplementedException();
        }



        [Authorize]
        [HttpPost]
        [Route("revoke/{username}")]
        public async Task<IActionResult> Revoke(string username)
        {
            throw new NotImplementedException();
        }



        private static string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private ClaimsPrincipal? GetPrincipalFromExpiredToken(string? token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Secret"])),
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
            if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");

            return principal;

        }

    }


}
