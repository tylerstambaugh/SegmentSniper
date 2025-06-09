namespace StravaApiClient.Services.Webhook
{
    public interface IDeleteStravaWebhookSubscription
    {
        Task<DeleteStravaWebhookSubscriptionContract.Result> ExecuteAsync(DeleteStravaWebhookSubscriptionContract contract);
    }

    public class DeleteStravaWebhookSubscriptionContract
    {
        public DeleteStravaWebhookSubscriptionContract(string clientId, string clientSecret, string subscriptionId)
        {
            ClientId = clientId;
            ClientSecret = clientSecret;
            SubscriptionId = subscriptionId;
        }

        public string ClientId { get; init; }
        public string ClientSecret { get; init; }
        public string SubscriptionId { get; init; }

        
        public class Result
        {            

            public Result(bool success)
            {
                Success = success;
            }

            public bool  Success { get; set; }
        }


    }
}