using Microsoft.Extensions.Configuration;
using SegmentSniper.Models.Models.Strava.Webhook;
using SegmentSniper.Services.StravaWebhook;
using StravaApiClient.Services.Webhook;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook
{
    public class ViewStravaWebhookSubscriptionHandler : IViewStravaWebhookSubscriptionHandler
    {
        private readonly IViewStravaWebhookSubscription _viewStravaWebhookSubscription;
        private readonly IGetStravaWebhookSubscriptionId _getStravaWebhookSubscriptionId;
        private readonly IConfiguration _configuration;

        public ViewStravaWebhookSubscriptionHandler(IViewStravaWebhookSubscription viewStravaWebhookSubscription, IGetStravaWebhookSubscriptionId getStravaWebhookSubscriptionId, IConfiguration configuration)
        {
            _viewStravaWebhookSubscription = viewStravaWebhookSubscription;
            _getStravaWebhookSubscriptionId = getStravaWebhookSubscriptionId;
            _configuration = configuration;
        }

        public async Task<ViewStravaWebhookSubscriptionRequest.Response> HandleAsync()
        {
            var subscriptionId = await _getStravaWebhookSubscriptionId.ExecuteAsync(new GetStravaWebhookSubscriptionIdContract());

            if (string.IsNullOrWhiteSpace(subscriptionId?.SubscriptionId))
            {
                throw new InvalidOperationException("No Strava webhook subscription ID found.");
            }

            var clientId = _configuration["StravaApiSettings-ClientId"];
            if (string.IsNullOrWhiteSpace(clientId))
            {
                throw new ArgumentException("Strava Client ID is not configured.");
            }

            var clientSecret = _configuration["StravaApiSettings-ClientSecret"];
            if (string.IsNullOrWhiteSpace(clientSecret))
            {
                throw new ArgumentException("Strava Client Secret is not configured.");
            }

            try
            {
                var response = await _viewStravaWebhookSubscription.ExecuteAsync(new ViewStravaWebhookSubscriptionContract(clientId, clientSecret));

                if (response == null || response.ViewSubscriptionApiResponse.Id == null)
                {
                    throw new InvalidOperationException("No Strava webhook subscription found.");
                }

                return new ViewStravaWebhookSubscriptionRequest.Response(new ViewSubscriptionResponseModel(response.ViewSubscriptionApiResponse.Id));                

            }
            catch (Exception ex)
            {
                throw new ApplicationException("An error occurred while viewing the Strava webhook subscription.", ex);
            }
        }


    }
}
