using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.Cmp;
using System.Text.Json.Serialization;

namespace SegmentSniper.Api.Controllers
{

    public record StravaVerifyResponse(
    [property: JsonPropertyName("hub.challenge")] string HubChallenge);


    [Route("api/[controller]")]
    [ApiController]
    public class WebhookController : ControllerBase
    {
        [HttpGet]
        public IActionResult Verify(
      [FromQuery(Name = "hub.challenge")] string challenge,
      [FromQuery(Name = "hub.mode")] string mode,
      [FromQuery(Name = "hub.verify_token")] string verifyToken)
        {
            // Optional: ensure mode == "subscribe" and verifyToken matches your secret

            return Ok(new StravaVerifyResponse(challenge));
        }
    }
}
