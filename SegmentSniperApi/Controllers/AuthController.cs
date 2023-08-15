using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SegmentSniper.Api.ActionHandlers.AuthActionHandlers;
using SegmentSniper.Api.ActionHandlers.LoginActionHandlers;
using SegmentSniper.Models.Models.User;

namespace SegmentSniper.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IAuthenticateUserActionHandler _authenticateActionHandler;
        private readonly IRegisterUserActionHandler _registerUserActionHandler;

        public AuthController(IConfiguration config, IAuthenticateUserActionHandler authenticateActionHandler, IRegisterUserActionHandler registerUserActionHandler)
        {
            _config = config;
            _authenticateActionHandler = authenticateActionHandler;
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
            var authenticateUser = _authenticateActionHandler.Handle(new AuthenticateUserLoginRequest(userLogin));

            if (authenticateUser.User != null)
            {
                var token = Generate(authenticateUser);
                return Ok(token);
            }
            return NotFound("username or password is incorrect");
        }

        private object Generate(object user)
        {
            throw new NotImplementedException();
        }
    }
}
