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
            var createStravaWebhookSubscriptionContract = new CreateStravaWebhookSubscriptionContract(
                verifyToken: "segment-sniper",
                callbackUrl: "https://as-segmentsniper-api-eastus-dev.azurewebsites.net/api/webhook/",
                clientId: _configuration["StravaApiSettings-ClientId"],
                clientSecret: _configuration["StravaApiSettings-ClientSecret"]
            );
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
