
using AutoMapper;
using StravaApiClient.Models.Webhook;

namespace StravaApiClient.Services.Webhook
{
    public class ViewStravaWebhookSubscription : IViewStravaWebhookSubscription
    {
        private readonly IStravaRequestClient _stravaRequestClient;
        private readonly IMapper _mapper;

        public ViewStravaWebhookSubscription(IStravaRequestClient stravaRequestClient, IMapper mapper)
        {
            _stravaRequestClient = stravaRequestClient;
            _mapper = mapper;
        }

        public async Task<ViewStravaWebhookSubscriptionContract.Result> ExecuteAsync(ViewStravaWebhookSubscriptionContract contract)
        {
            ValidateContract(contract);

            var url = $"https://www.strava.com/api/v3/push_subscriptions/?client_id={contract.ClientId}&client_secret={contract.ClientSecret}";


            var apiResponse = await _stravaRequestClient.GetWebhookSubscription<ViewSubscriptionApiResponse>(url);

            //You will receive a 204 No Content if the delete is successful. Otherwise, an error will be returned containing the reason for a failure.
            if (apiResponse != null)            {
                
                return new ViewStravaWebhookSubscriptionContract.Result(apiResponse);
            }
            throw new InvalidOperationException("Failed to retrieve Strava webhook subscription details.");

        }

        private void ValidateContract(ViewStravaWebhookSubscriptionContract contract)
        {
            if (contract == null) throw new ArgumentNullException(nameof(contract));
            if (string.IsNullOrEmpty(contract.ClientId)) throw new ArgumentException("Client ID must be provided", nameof(contract.ClientId));
            if (string.IsNullOrEmpty(contract.ClientSecret)) throw new ArgumentException("Client secret must be provided", nameof(contract.ClientSecret));
        }
    }
}
