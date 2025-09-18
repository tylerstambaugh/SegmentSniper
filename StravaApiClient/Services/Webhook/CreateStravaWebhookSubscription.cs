using StravaApiClient.Configuration;
using StravaApiClient.Models.Webhook;

namespace StravaApiClient.Services.Webhook
{
    public class CreateStravaWebhookSubscription : ICreateStravaWebhookSubscription
    {
        private readonly IStravaRequestClient _stravaRequestClient;
        private readonly IStravaRequestClientConfiguration _configuration;

        public CreateStravaWebhookSubscription(IStravaRequestClient stravaRequestClient, IStravaRequestClientConfiguration configuration)
        {
            _stravaRequestClient = stravaRequestClient;
            _configuration = configuration;
        }
        public async Task<CreateStravaWebhookSubscriptionContract.Result> ExecuteAsync(CreateStravaWebhookSubscriptionContract contract)
        {
            ValidateContract(contract);
            var parameters = new CreateStravaWebhookSubscriptionData(contract.VerifyToken, contract.CallbackUrl, contract.ClientId, contract.ClientSecret)
            {
                VerifyToken = contract.VerifyToken,
                CallbackUrl = contract.CallbackUrl,
                ClientId = contract.ClientId,
                ClientSecret = contract.ClientSecret
            };

            var baseUrl = _configuration.BaseUrl;

            //the response to this request should return with an 'id' that is the subscriptionId that will need to be persisted
            var apiResponse =  await _stravaRequestClient.PostWebhookSubscription<CreateStravaWebhookSubscriptionData, CreateSubscriptionApiResponse>($"{baseUrl}push_subscriptions", parameters);

            return new CreateStravaWebhookSubscriptionContract.Result { Id  = apiResponse.Id };
        }

        private void ValidateContract(CreateStravaWebhookSubscriptionContract contract)
        {
            if (contract == null) throw new ArgumentNullException(nameof(contract));
            if (string.IsNullOrEmpty(contract.VerifyToken)) throw new ArgumentException("Verify token must be provided", nameof(contract.VerifyToken));
            if (string.IsNullOrEmpty(contract.CallbackUrl)) throw new ArgumentException("Callback URL must be provided", nameof(contract.CallbackUrl));
            if (string.IsNullOrEmpty(contract.ClientId)) throw new ArgumentException("Client ID must be provided", nameof(contract.ClientId));
            if (string.IsNullOrEmpty(contract.ClientSecret)) throw new ArgumentException("Client secret must be provided", nameof(contract.ClientSecret));
        }
    }
}