using Microsoft.Extensions.Configuration;
using StravaApiClient.Services.Webhook;
using SegmentSniper.Services.StravaWebhook;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook
{
    public class CreateStravaWebhookSubscriptionHandler : ICreateStravaWebhookSubscriptionHandler
    {
        private readonly ICreateStravaWebhookSubscription _createStravaWebhookSubscription;
        private readonly ISaveStravaWebhookSubscriptionId _saveStravaWebhookSubscriptionId;
        private readonly IConfiguration _configuration;

        public CreateStravaWebhookSubscriptionHandler(
            ICreateStravaWebhookSubscription createStravaWebhookSubscription,
            ISaveStravaWebhookSubscriptionId saveStravaWebhookSubscriptionId,
            IConfiguration configuration)
        {
            _createStravaWebhookSubscription = createStravaWebhookSubscription;
            _saveStravaWebhookSubscriptionId = saveStravaWebhookSubscriptionId;
            _configuration = configuration;
        }        

        public async Task<bool> ExecuteAsync()
        {

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

            var callbackUrl = _configuration["CallbackUrl"];
            if (string.IsNullOrWhiteSpace(callbackUrl))
            {
                throw new ArgumentException("Callback URL is not configured");
            }

            var createStravaWebhookSubscriptionContract = new CreateStravaWebhookSubscriptionContract(
                verifyToken: "segment-sniper",
                callbackUrl: callbackUrl,
                clientId: clientId,
                clientSecret: clientSecret
            );

            //strava should response to this with the subscription ID
            var stravaResponse = await _createStravaWebhookSubscription.ExecuteAsync(createStravaWebhookSubscriptionContract);

            if (stravaResponse.Id != 0)
            {
                // Save the subscription ID to the database
                await _saveStravaWebhookSubscriptionId.ExecuteAsync(new SaveStravaWebhookSubscriptionIdContract
                {
                    StravaWebhookSubscriptionId = stravaResponse.Id
                });

                return true;
            }
            return false;
        }
    }
}
