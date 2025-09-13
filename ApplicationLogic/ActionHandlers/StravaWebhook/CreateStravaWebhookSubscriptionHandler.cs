using Microsoft.Extensions.Configuration;
using SegmentSniper.Services.StravaWebhook;
using StravaApiClient.Services.Webhook;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook
{
    public class CreateStravaWebhookSubscriptionHandler : ICreateStravaWebhookSubscriptionHandler
    {
        private readonly IGetStravaWebhookSubscriptionId _getStravaWebhookSubscriptionId;
        private readonly ICreateStravaWebhookSubscription _createStravaWebhookSubscription;
        private readonly ISaveStravaWebhookSubscriptionId _saveStravaWebhookSubscriptionId;
        private readonly IConfiguration _configuration;

        private string CallbackUrl;
        private string ClientId;
        private string ClientSecret;


        public CreateStravaWebhookSubscriptionHandler(
            IGetStravaWebhookSubscriptionId getStravaWebhookSubscriptionId,
            ICreateStravaWebhookSubscription createStravaWebhookSubscription,
            ISaveStravaWebhookSubscriptionId saveStravaWebhookSubscriptionId,
            IConfiguration configuration)
        {
            _getStravaWebhookSubscriptionId = getStravaWebhookSubscriptionId;
            _createStravaWebhookSubscription = createStravaWebhookSubscription;
            _saveStravaWebhookSubscriptionId = saveStravaWebhookSubscriptionId;
            _configuration = configuration;
        }

        public async Task<CreateStravaWebhookSubscriptionResponse> ExecuteAsync()
        {
            try
            {

                Validate();


                var createStravaWebhookSubscriptionContract = new CreateStravaWebhookSubscriptionContract(
                    verifyToken: "segment-sniper",
                    callbackUrl: CallbackUrl,
                    clientId: ClientId,
                    clientSecret: ClientSecret
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

                    return new CreateStravaWebhookSubscriptionResponse(true);
                }
                return new CreateStravaWebhookSubscriptionResponse(false, "Error 657");
            }
            catch (Exception ex)
            {
                return new CreateStravaWebhookSubscriptionResponse(false, ex.Message);
            }
        }

        private async Task Validate()
        {

            var existingId = await _getStravaWebhookSubscriptionId.ExecuteAsync(new GetStravaWebhookSubscriptionIdContract());

            if (existingId.SubscriptionId != null)
            {
                throw new ApplicationException("Strava Webhook Subscription ID already exists.  Please delete the existing subscription before initiating a request for a new subscription.");
            }
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

            CallbackUrl = _configuration["CallbackUrl"];
            if (string.IsNullOrWhiteSpace(CallbackUrl))
            {
                throw new ArgumentException("Callback URL is not configured");
            }
        }
    }
}
