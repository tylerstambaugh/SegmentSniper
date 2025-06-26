using StravaApiClient.Models.Webhook;

namespace StravaApiClient.Services.Webhook
{
    public interface IViewStravaWebhookSubscription
    {
        Task<ViewStravaWebhookSubscriptionContract.Result> ExecuteAsync(ViewStravaWebhookSubscriptionContract contract);
    }

    public class ViewStravaWebhookSubscriptionContract
    {
        public ViewStravaWebhookSubscriptionContract(string clientId, string clientSecret)
        {
            ClientId = clientId;
            ClientSecret = clientSecret;
        }

        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public class Result
        {
            public ViewSubscriptionApiResponse ViewSubscriptionApiResponse { get; set; }
            public Result(ViewSubscriptionApiResponse viewSubscriptionApiResponse)
            {
                ViewSubscriptionApiResponse = viewSubscriptionApiResponse ?? throw new ArgumentNullException(nameof(viewSubscriptionApiResponse));
            }
        }
    }
}