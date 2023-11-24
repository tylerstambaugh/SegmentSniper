using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SegmentSniper.Api.Controllers.Requests;

namespace SegmentSniper.Api.Controllers
{
    [EnableCors("AllowReactApp")]
    [Route("api/[controller]")]
    [ApiController]
    public class ClientConfigurationController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ClientConfigurationController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<ClientConfigurationRequest.Response>> GetClientConfiguration()
        {
            var stravaApiClientId = _configuration["StravaApiSettings-ClientId"];
            var googleMapsApiKey = _configuration.GetValue<string>("GoogleMapsApi-Key");
            var clientConfig = new ClientConfigurationRequest.Response(stravaApiClientId, googleMapsApiKey);

            return Ok(clientConfig);
        }
    }
}
