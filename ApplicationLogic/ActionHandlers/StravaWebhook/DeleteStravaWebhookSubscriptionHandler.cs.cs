using Microsoft.Extensions.Configuration;
using SegmentSniper.Services.StravaWebhook;
using StravaApiClient;
using StravaApiClient.Services.Webhook;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook
{
    public class DeleteStravaWebhookSubscriptionHandler : IDeleteStravaWebhookSubscriptionHandler
    {
        private readonly IGetStravaWebhookSubscriptionId _getStravaWebhookSubscriptionId;
        private readonly IDeleteStravaWebhookSubscription _deleteStravaWebhookSubscription;
        private readonly IStravaRequestService _stravaRequestService;
        private readonly IDeleteStravaWebhookSubscriptionService _deleteStravaWebhookSubscriptionService;
        
        private readonly IConfiguration _configuration;

        private string ClientId;
        private string ClientSecret;

        public DeleteStravaWebhookSubscriptionHandler(IGetStravaWebhookSubscriptionId getStravaWebhookSubscriptionId,
            IDeleteStravaWebhookSubscription deleteStravaWebhookSubscription,
            IDeleteStravaWebhookSubscriptionService deleteStravaWebhookSubscriptionService,
            IConfiguration configuration)
        {
            _getStravaWebhookSubscriptionId = getStravaWebhookSubscriptionId;
            _deleteStravaWebhookSubscription = deleteStravaWebhookSubscription;            
            _deleteStravaWebhookSubscriptionService = deleteStravaWebhookSubscriptionService;
            _configuration = configuration;
        }

        public async Task<DeleteStravaWebhookSubscriptionRequest.Response> HandleAsync()
        {
            var subscriptionIdResult = await _getStravaWebhookSubscriptionId.ExecuteAsync(new GetStravaWebhookSubscriptionIdContract());

            ClientId = _configuration["StravaApiSettings-ClientId"];
            if (string.IsNullOrWhiteSpace(ClientId))
            {
                throw new ArgumentException("Strava Client ID is not configured.");
            }

            ClientSecret = _configuration["StravaApiSettings-ClientSecret"];
            if (string.IsNullOrWhiteSpace(ClientSecret))
            {
                throw new ArgumentException("Strava Client Secret is not configured.");
            }

            if (subscriptionIdResult.SubscriptionId == 0)
            {
                throw new InvalidOperationException("No Strava webhook subscription ID found.");
            }

            try
            {
                var response = await _deleteStravaWebhookSubscription.ExecuteAsync(new DeleteStravaWebhookSubscriptionApiContract(ClientId, ClientSecret, subscriptionIdResult.SubscriptionId));
                
                if(response.Success)
                {
                    var localResponse = await _deleteStravaWebhookSubscriptionService.ExecuteAsync(new DeleteStravaWebhookSubscriptionContract(subscriptionIdResult.SubscriptionId));
                    return new DeleteStravaWebhookSubscriptionRequest.Response(localResponse.Success);
                }
                return new DeleteStravaWebhookSubscriptionRequest.Response(false, "Failed to delete Strava webhook subscription.");
            }
            catch (Exception ex)
            {
                return new DeleteStravaWebhookSubscriptionRequest.Response(false, ex.Message);
            }
        }
    }
}
