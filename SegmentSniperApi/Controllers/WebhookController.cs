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
        private readonly ILogger<WebhookController> _logger;
        private readonly ICreateStravaWebhookSubscriptionHandler _createStravaWebhookSubscriptionHandler;
        private readonly IViewStravaWebhookSubscriptionHandler _viewStravaWebhookSubscriptionHandler;
        private readonly IDeleteStravaWebhookSubscriptionHandler _deleteStravaWebhookSubscriptionHandler;
        private readonly IGetStravaWebhookSubscriptionId _getStravaWebhookSubscriptionId;
        private readonly WebhookEventHandlerFactory _webhookEventHandlerFactory;
        private readonly IServiceScopeFactory _scopeFactory;


        public WebhookController(ILogger<WebhookController> logger, ICreateStravaWebhookSubscriptionHandler createStravaWebhookSubscriptionHandler,
            IViewStravaWebhookSubscriptionHandler viewStravaWebhookSubscriptionHandler,
            IDeleteStravaWebhookSubscriptionHandler deleteStravaWebhookSubscriptionHandler,
            IGetStravaWebhookSubscriptionId getStravaWebhookSubscriptionId,            
            WebhookEventHandlerFactory webhookEventHandlerFactory,
             IServiceScopeFactory scopeFactory
            )
        {
            _logger = logger;
            _createStravaWebhookSubscriptionHandler = createStravaWebhookSubscriptionHandler;
            _viewStravaWebhookSubscriptionHandler = viewStravaWebhookSubscriptionHandler;
            _deleteStravaWebhookSubscriptionHandler = deleteStravaWebhookSubscriptionHandler;
            _getStravaWebhookSubscriptionId = getStravaWebhookSubscriptionId;
            _webhookEventHandlerFactory = webhookEventHandlerFactory;
            _scopeFactory = scopeFactory;
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
                _logger.LogError($"failing verify token. verifyToken: {verifyToken}, mode: {mode}, challenge: {challenge}");
                return BadRequest("Invalid verify token.");
            }

            return Ok(new StravaVerifyResponse(challenge));
        }

        [HttpPost]
        public IActionResult ReceiveUpdate(WebhookEvent payload)
        {
            if (payload == null)
                return BadRequest("Invalid payload.");

            _logger.LogInformation($"Received Strava webhook event: ObjectType={payload.ObjectType}, AspectType={payload.AspectType}, ObjectId={payload.ObjectId}");
            _ = Task.Run(async () =>
            {
                try
                {
                    using var scope = _scopeFactory.CreateScope();

                    var handlerFactory = scope.ServiceProvider.GetRequiredService<WebhookEventHandlerFactory>();
                    var handler = handlerFactory.GetHandler(payload.AspectType);

                    await handler.HandleEventAsync(payload);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error processing Strava webhook event");
                }
            });

            return Ok(); 
                         
        }

        [Authorize]
        [HttpGet]
        [Route("initiate")]
        public async Task<IActionResult> InitiateSubscription()
        {

            var response = await _createStravaWebhookSubscriptionHandler.ExecuteAsync();

            if (!response.Success)
            {
                return StatusCode(400, $"Failed to initiate subscription. {response.Error}");
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
            if (response.ViewSubscriptionResponseModel == null)
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
                return StatusCode(500, $"Failed to delete subscription: {response.Message}");
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
                return NotFound();
            }
        }
    }
}
