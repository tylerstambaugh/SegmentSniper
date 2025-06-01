using GraphQL;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;

namespace SegmentSniper.Api.Controllers
{

    public record StravaVerifyResponse(
    [property: JsonPropertyName("hub.challenge")] string HubChallenge);


    [Route("api/[controller]")]
    [ApiController]
    public class WebhookController : ControllerBase
    {

        public WebhookController()
        {
            
        }

        [HttpGet]
        public IActionResult Verify(
        [FromQuery(Name = "hub.challenge")] string challenge,
        [FromQuery(Name = "hub.mode")] string mode,
        [FromQuery(Name = "hub.verify_token")] string verifyToken)
        {
            // Optional: ensure mode == "subscribe" and verifyToken matches your secret

            return Ok(new StravaVerifyResponse(challenge));
        }

        [Authorize]
        [HttpPost]
        public IActionResult InitiateSubscription()
        {


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
