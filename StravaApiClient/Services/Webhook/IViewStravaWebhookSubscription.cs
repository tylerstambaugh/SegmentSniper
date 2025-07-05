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

            //[{"id":290937,"resource_state":2,"application_id":93654,"callback_url":"https://locust-brave-certainly.ngrok-free.app/api/Webhook","created_at":"2025-07-03T01:56:39+00:00","updated_at":"2025-07-03T01:56:39+00:00"}]
            public Result(ViewSubscriptionApiResponse viewSubscriptionApiResponse)
            {
                ViewSubscriptionApiResponse = viewSubscriptionApiResponse ?? throw new ArgumentNullException(nameof(viewSubscriptionApiResponse));
            }
        }
    }
}