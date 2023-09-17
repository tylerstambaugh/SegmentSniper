using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SegmentSniper.Api.ActionHandlers.AuthActionHandlers;
using SegmentSniper.Api.ActionHandlers.LoginActionHandlers;
using SegmentSniper.Models.Models.Auth;
using SegmentSniper.Models.Models.Auth.User;

namespace SegmentSniper.Api.Controllers
{
    [EnableCors("AllowReactApp")]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ILoginUserActionHandler _loginUserActionHandler;
        private readonly IRegisterUserActionHandler _registerUserActionHandler;
        private readonly IRefreshTokenActionHandler _refreshTokenActionHandler;

        public AuthController(ILoginUserActionHandler loginUserActionHandler, IRegisterUserActionHandler registerUserActionHandler, IRefreshTokenActionHandler refreshTokenActionHandler)
        {
            _loginUserActionHandler = loginUserActionHandler;
            _registerUserActionHandler = registerUserActionHandler;
            _refreshTokenActionHandler = refreshTokenActionHandler;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register([FromBody] RegisterUserDto registerUser)
        {
            try
            {
                var registeredUser = await _registerUserActionHandler.Handle(new RegisterUserRequest { User = registerUser });
                if (registeredUser != null)
                {
                    return Ok(registeredUser);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while processing the request. Error: {ex}");
            }
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLogin userLogin)
        {
            try
            {
                var authenticatedUser = await _loginUserActionHandler.Handle(new LoginUserRequest(userLogin));

                if (authenticatedUser.TokenData != null)
                {
                    return Ok(authenticatedUser);
                }
                return Unauthorized("Username or password is incorrect");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while processing the request. Error: {ex}");
            }
        }

        [HttpPost]
        [Route("refresh-token")]
        public async Task<IActionResult> RefreshToken(TokenModel tokenModel)
        {
            if (tokenModel is null)
            {
                return BadRequest("Invalid client request");
            }
            else
            {
                try
                {
                    var refreshedToken = _refreshTokenActionHandler.Handle(new RefreshTokenRequest(tokenModel));
                    return Ok(refreshedToken);
                }
                catch (Exception ex)
                {
                    return BadRequest($"Invalid access or refresh token: {nameof(tokenModel)}");
                }
            }
        }

        [Authorize]
        [HttpPost]
        [Route("revoke/{username}")]
        public async Task<IActionResult> Revoke(string username)
        {
            throw new NotImplementedException();
        }
    }
}
