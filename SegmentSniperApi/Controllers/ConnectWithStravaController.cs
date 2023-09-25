using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SegmentSniper.Api.ActionHandlers.StravaApiToken;
using static SegmentSniper.Api.ActionHandlers.StravaApiToken.IExchangeAuthCodeForTokenHandler;

namespace SegmentSniper.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]/")]
    [ApiController]
    public class ConnectWithStravaController : ControllerBase
    {
        private readonly IExchangeAuthCodeForTokenHandler _exchangeAuthCodeForTokenHandler;

        public ConnectWithStravaController(IExchangeAuthCodeForTokenHandler exchangeAuthCodeForTokenHandler)
        {
            _exchangeAuthCodeForTokenHandler = exchangeAuthCodeForTokenHandler;
        }


        [AllowAnonymous]
        [HttpGet("{id}")]
        //[ActionName("ExchangeToken/")]
        public IActionResult ExchangeToken(string id, [FromQuery] string code, [FromQuery] string scope)
        {
            ExchangeAuthCodeForTokenRequest contract = new ExchangeAuthCodeForTokenRequest
            {
                UserId = id,
                AuthCode = code,
                Scopes = scope,
            };

            var handleSuccess = _exchangeAuthCodeForTokenHandler.Execute(contract).Result;

            if (handleSuccess.TokenWasAdded)
            {
                string url = "https://localhost:44411/connect-with-strava-success";
                return Redirect(url);
            }
            else
            {
                string url = "https://localhost:44411/connect-with-strava-error";
                return Redirect(url);
            }
        }
    }

}
