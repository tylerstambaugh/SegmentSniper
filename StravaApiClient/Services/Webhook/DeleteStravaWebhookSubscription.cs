
namespace StravaApiClient.Services.Webhook
{
    public class DeleteStravaWebhookSubscription : IDeleteStravaWebhookSubscription
    {
        private readonly IStravaRequestClient _stravaRequestClient;

        public DeleteStravaWebhookSubscription(IStravaRequestClient stravaRequestClient)
        {
            _stravaRequestClient = stravaRequestClient;
        }

        public async Task<DeleteStravaWebhookSubscriptionApiRequest.Response> ExecuteAsync(DeleteStravaWebhookSubscriptionApiRequest contract)
        {
            ValidateContract(contract);

            var url = $"https://www.strava.com/api/v3/push_subscriptions/{contract.SubscriptionId}";


            var apiResponse = await _stravaRequestClient.DeleteAsync<HttpResponseMessage>(url);

            //You will receive a 204 No Content if the delete is successful. Otherwise, an error will be returned containing the reason for a failure.
            if (apiResponse != null) 
            {
                return new DeleteStravaWebhookSubscriptionApiRequest.Response(apiResponse.StatusCode == System.Net.HttpStatusCode.OK);
            }
            return new DeleteStravaWebhookSubscriptionApiRequest.Response(false);
        }

        private void ValidateContract(DeleteStravaWebhookSubscriptionApiRequest contract)
        {
            if (contract == null) throw new ArgumentNullException(nameof(contract));
            if (string.IsNullOrEmpty(contract.ClientId)) throw new ArgumentException("Client ID must be provided", nameof(contract.ClientId));
            if (string.IsNullOrEmpty(contract.ClientSecret)) throw new ArgumentException("Client secret must be provided", nameof(contract.ClientSecret));
        }
    }
}
