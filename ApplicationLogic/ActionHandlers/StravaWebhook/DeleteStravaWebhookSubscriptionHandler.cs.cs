using Microsoft.Extensions.Configuration;
using SegmentSniper.Data;
using SegmentSniper.Services.StravaWebhook;
using StravaApiClient.Services.Webhook;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook
{
    public class DeleteStravaWebhookSubscriptionHandler : IDeleteStravaWebhookSubscriptionHandler
    {
        private readonly IGetStravaWebhookSubscriptionId _getStravaWebhookSubscriptionId;
        private readonly IDeleteStravaWebhookSubscription _deleteStravaWebhookSubscription;
        private readonly IConfiguration _configuration;

        public DeleteStravaWebhookSubscriptionHandler(IGetStravaWebhookSubscriptionId getStravaWebhookSubscriptionId,
            IDeleteStravaWebhookSubscription deleteStravaWebhookSubscription,
            IConfiguration configuration)
        {
            _getStravaWebhookSubscriptionId = getStravaWebhookSubscriptionId;
            _deleteStravaWebhookSubscription = deleteStravaWebhookSubscription;
            _configuration = configuration;
        }

        public async Task<DeleteStravaWebhookSubscriptionRequest.Response> HandleAsync()
        {
            var subscriptionIdResult = await _getStravaWebhookSubscriptionId.ExecuteAsync(new GetStravaWebhookSubscriptionIdContract());
            var clientId = _configuration["Strava:ClientId"] ?? throw new InvalidOperationException("Strava Client ID is not configured.");
            var clientSecret = _configuration["Strava:ClientSecret"] ?? throw new InvalidOperationException("Strava Client Secret is not configured.");
            if (subscriptionIdResult.SubscriptionId == 0)
            {
                throw new InvalidOperationException("No Strava webhook subscription ID found.");
            }
            try
            {
                var response = await _deleteStravaWebhookSubscription.ExecuteAsync(new DeleteStravaWebhookSubscriptionApiRequest(clientId, clientSecret, subscriptionIdResult.SubscriptionId));
                return new DeleteStravaWebhookSubscriptionRequest.Response(response.Success);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("An error occurred while deleting the Strava webhook subscription.", ex);
            }
        }
    }
}
