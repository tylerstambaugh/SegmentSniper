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
        public IActionResult ReceiveUpdate(WebhookEvent payload)
        {
            if (payload != null)
            {
               
                // Fire and forget safely
                _ = Task.Run(async () =>
                {
                    try
                    {
                        var eventType = payload.AspectType;
                        var handler = _webhookEventHandlerFactory.GetHandler(eventType);
                        await handler.HandleEventAsync(payload);
                    }
                    catch (Exception ex)
                    {
                        // Log exception here
                        // e.g., _logger.LogError(ex, "Error processing webhook event.");
                    }
                });

                return Ok(); // Return immediately
            }
            else
            {
                return BadRequest("we don't understand you.");
            }               
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
