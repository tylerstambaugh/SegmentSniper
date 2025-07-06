using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SegmentSniper.ApplicationLogic.ActionHandlers.StravaApiToken;

namespace SegmentSniper.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]/")]
    [ApiController]
    public class ConnectWithStravaController : ControllerBase
    {
        private readonly IExchangeAuthCodeForTokenHandler _exchangeAuthCodeForTokenHandler;
        private readonly IConfiguration _config;

        public ConnectWithStravaController(IExchangeAuthCodeForTokenHandler exchangeAuthCodeForTokenHandler, IConfiguration config)
        {
            _exchangeAuthCodeForTokenHandler = exchangeAuthCodeForTokenHandler;
            _config = config;
        }


        [AllowAnonymous]
        [HttpGet("{userId}")]
        //[ActionName("ExchangeToken/")]
        public IActionResult ExchangeToken(string userId, [FromQuery] string code, [FromQuery] string scope)
        {
            ExchangeAuthCodeForTokenRequest contract = new ExchangeAuthCodeForTokenRequest
            {
                UserId = userId,
                AuthCode = code,
                Scopes = scope,
            };

            var handleSuccess = _exchangeAuthCodeForTokenHandler.Execute(contract).Result;

            if (handleSuccess.TokenWasAdded)
                return Redirect(_config.GetSection("ConnectWithStravaReturnPages:Success").Value);
            return Redirect(_config.GetSection("ConnectWithStravaReturnPages:Error").Value);

        }
    }

}
