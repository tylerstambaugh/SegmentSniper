using GraphQL;
using Microsoft.AspNetCore.Mvc;
using SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook;
using SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook.Factory;
using SegmentSniper.Services.StravaWebhook;
using System.Text.Json.Serialization;

namespace SegmentSniper.Api.Controllers
{

    public record StravaVerifyResponse(
    [property: JsonPropertyName("hub.challenge")] string hubChallenge);


    [Route("api/[controller]")]
    [ApiController]
    public class WebhookController : ControllerBase
    {
        private readonly ICreateStravaWebhookSubscriptionHandler _createStravaWebhookSubscriptionHandler;
        private readonly IViewStravaWebhookSubscriptionHandler _viewStravaWebhookSubscriptionHandler;
        private readonly IDeleteStravaWebhookSubscriptionHandler _deleteStravaWebhookSubscriptionHandler;
        private readonly IGetStravaWebhookSubscriptionId _getStravaWebhookSubscriptionId;
        private readonly WebhookEventHandlerFactory _webhookEventHandlerFactory;

        public WebhookController(ICreateStravaWebhookSubscriptionHandler createStravaWebhookSubscriptionHandler,
            IViewStravaWebhookSubscriptionHandler viewStravaWebhookSubscriptionHandler,
            IDeleteStravaWebhookSubscriptionHandler deleteStravaWebhookSubscriptionHandler,
            IGetStravaWebhookSubscriptionId getStravaWebhookSubscriptionId,
            IProcessWebhookUpdate processWebhookUpdate,
            WebhookEventHandlerFactory webhookEventHandlerFactory
            )
        {
            _createStravaWebhookSubscriptionHandler = createStravaWebhookSubscriptionHandler;
            _viewStravaWebhookSubscriptionHandler = viewStravaWebhookSubscriptionHandler;
            _deleteStravaWebhookSubscriptionHandler = deleteStravaWebhookSubscriptionHandler;
            _getStravaWebhookSubscriptionId = getStravaWebhookSubscriptionId;
            _webhookEventHandlerFactory = webhookEventHandlerFactory;
        }

        [HttpGet]
        public IActionResult Verify(
        [FromQuery(Name = "hub.challenge")] string challenge,
        [FromQuery(Name = "hub.mode")] string mode,
        [FromQuery(Name = "hub.verify_token")] string verifyToken)
        {

            //strava willl ping this when a subsciption creation request is made.
            if (verifyToken != "segment-sniper")
            {
                return BadRequest("Invalid verify token.");
            }

            return Ok(new StravaVerifyResponse(challenge));
        }

        [HttpPost]
        public async Task<IActionResult> ReceiveUpdate(WebhookEvent payload)
        {

            using var reader = new StreamReader(Request.Body);
            var body = await reader.ReadToEndAsync();

            Console.WriteLine("Webhook payload: " + body);

            var otherObject = payload;


            if (payload != null)
            {
                var result = await _processWebhookUpdate.HandleAsync(payload);
                return Ok();
            }
            else
            {
                return BadRequest("we don't understand you.");
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

        [Authorize]
        [HttpGet]
        [Route("initiate")]
        public async Task<IActionResult> InitiateSubscription()
        {

            var response = await _createStravaWebhookSubscriptionHandler.ExecuteAsync();

            if (!response)
            {
                return StatusCode(500, "Failed to initiate subscription.");
            }

            return Ok(new
            {
                message = "Subscription initiated successfully."
            });
        }

        [Authorize]
        [HttpGet]
        [Route("viewSubscription")]
        public async Task<IActionResult> ViewSubscription()
        {
            var response = await _viewStravaWebhookSubscriptionHandler.HandleAsync();
            if (response == null)
            {
                return NotFound("No subscription found.");
            }
            return Ok(new
            {
                subscriptionId = response.ViewSubscriptionResponseModel.Id,
            });
        }

        [Authorize]
        [HttpDelete]
        [Route("deleteSubscription")]
        public async Task<IActionResult> DeleteSubscription()
        {
            var response = await _deleteStravaWebhookSubscriptionHandler.HandleAsync();
            if (!response.Success)
            {
                return StatusCode(500, "Failed to delete subscription.");
            }
            return Ok(new
            {
                message = "Subscription deleted successfully."
            });
        }

        [Authorize]
        [HttpGet]
        [Route("getExistingSubscriptionId")]
        public async Task<IActionResult> GetExistingSubscriptionId()
        {
            try
            {
                var result = await _getStravaWebhookSubscriptionId.ExecuteAsync(new GetStravaWebhookSubscriptionIdContract());
                return Ok(result);
            }
            catch (Exception)
            {
                return Ok(null);
            }

        }
    }
}
