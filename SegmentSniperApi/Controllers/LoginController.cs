using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SegmentSniper.Api.ActionHandlers.LoginActionHandlers;
using SegmentSniper.Api.Models.User;

namespace SegmentSniper.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IAuthenticateActionHandler _authenticateActionHandler;

        public LoginController(IConfiguration config, IAuthenticateActionHandler authenticateActionHandler)
        {
            _config = config;
            _authenticateActionHandler = authenticateActionHandler;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody] UserLogin userLogin)
        {
            var authenticateUser = _authenticateActionHandler.Execute(new AuthenticateUserLoginContract(userLogin));

            if(authenticateUser.User != null)
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
