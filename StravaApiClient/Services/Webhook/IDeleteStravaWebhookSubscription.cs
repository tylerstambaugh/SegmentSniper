namespace StravaApiClient.Services.Webhook
{
    public interface IDeleteStravaWebhookSubscription
    {
        Task<DeleteStravaWebhookSubscriptionApiRequest.Response> ExecuteAsync(DeleteStravaWebhookSubscriptionApiRequest contract);
    }

    public class DeleteStravaWebhookSubscriptionApiRequest
    {
        public DeleteStravaWebhookSubscriptionApiRequest(string clientId, string clientSecret, int subscriptionId)
        {
            ClientId = clientId;
            ClientSecret = clientSecret;
            SubscriptionId = subscriptionId;
        }

        public string ClientId { get; init; }
        public string ClientSecret { get; init; }
        public int SubscriptionId { get; init; }

        
        public class Response
        {            

            public Response(bool success)
            {
                Success = success;
            }

            public bool  Success { get; set; }
        }


    }
}