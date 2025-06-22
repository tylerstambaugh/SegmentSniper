using StravaApiClient.Models.Webhook;
using System.Text.Json.Serialization;

namespace StravaApiClient.Services.Webhook
{
    public class CreateStravaWebhookSubscription : ICreateStravaWebhookSubscription
    {
        private readonly IStravaRequestClient _stravaRequestClient;

        public CreateStravaWebhookSubscription(IStravaRequestClient stravaRequestClient)
        {
            _stravaRequestClient = stravaRequestClient;
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

            //the response to this request should return with an 'id' that is the subscriptionId that will need to be persisted
           var apiResponse =  await _stravaRequestClient.PostAsync<CreateStravaWebhookSubscriptionData, CreateSubscriptionApiResponse>("push_subscriptions", parameters);

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