using GraphQL;
using Microsoft.AspNetCore.Mvc;
using StravaApiClient.Services.Webhook;
using System.Text.Json.Serialization;

namespace SegmentSniper.Api.Controllers
{

    public record StravaVerifyResponse(
    [property: JsonPropertyName("hub.challenge")] string hubChallenge);


    [Route("api/[controller]")]
    [ApiController]
    public class WebhookController : ControllerBase
    {
        private readonly ICreateStravaWebhookSubscription _createStravaWebhookSubscription;
        private readonly IConfiguration _configuration;

        _stravaApiSettings = _configuration.GetSection("StravaApiSettings").Get<StravaApiSettings>();

        public WebhookController(ICreateStravaWebhookSubscription createStravaWebhookSubscription, IConfiguration configuration1)
        {
            _createStravaWebhookSubscription = createStravaWebhookSubscription;
            _configuration1 = configuration1;
        }

        [HttpGet]
        [Route("verify")]
        public IActionResult Verify(
        [FromQuery(Name = "hub.challenge")] string challenge,
        [FromQuery(Name = "hub.mode")] string mode,
        [FromQuery(Name = "hub.verify_token")] string verifyToken)
        {
            if(verifyToken != "segment-sniper")
            {
                return BadRequest("Invalid verify token.");
            }

            return Ok(new StravaVerifyResponse(challenge));
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> InitiateSubscription()
        {

            var respone = await _createStravaWebhookSubscription.ExecuteAsync(new CreateStravaWebhookSubscriptionContract(
                verifyToken: "segment-sniper",
                callbackUrl: "https://your-callback-url.com/api/webhook/verify", 
                clientId: "your-client-id", // Replace with your actual client ID
                clientSecret: "your-client-secret" // Replace with your actual client secret
            ));


            return Ok(new
            {
                message = "Subscription initiated successfully."
            });
        }


    }





    //    object_type
    //string Always either "activity" or "athlete."
    //object_id
    //long integer    For activity events, the activity's ID. For athlete events, the athlete's ID.
    //aspect_type
    //string Always "create," "update," or "delete."
    //updates
    //hash    For activity update events, keys can contain "title," "type," and "private," which is always "true" (activity visibility set to Only You) or "false" (activity visibility set to Followers Only or Everyone). For app deauthorization events, there is always an "authorized" : "false" key-value pair.
    //owner_id
    //long integer    The athlete's ID.
    //subscription_id
    //integer The push subscription ID that is receiving this event.
    //event_time
    //long integer    The time that the event occurred.
    //Example Request
    //{
    //        "aspect_type": "update",
    //    "event_time": 1516126040,
    //    "object_id": 1360128428,
    //    "object_type": "activity",
    //    "owner_id": 134815,
    //    "subscription_id": 120475,
    //    "updates": {
    //            "title": "Messy"
    //    }
    //    }

}
