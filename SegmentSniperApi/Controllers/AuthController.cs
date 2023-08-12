using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SegmentSniper.Api.ActionHandlers.LoginActionHandlers;
using SegmentSniper.Models.Models.User;

namespace SegmentSniper.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IAuthenticateActionHandler _authenticateActionHandler;

        public AuthController(IConfiguration config, IAuthenticateActionHandler authenticateActionHandler)
        {
            _config = config;
            _authenticateActionHandler = authenticateActionHandler;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register()
        {
            throw new NotImplementedException();
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
