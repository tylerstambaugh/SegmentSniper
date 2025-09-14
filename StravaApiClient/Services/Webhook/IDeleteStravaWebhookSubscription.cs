namespace StravaApiClient.Services.Webhook
{
    public interface IDeleteStravaWebhookSubscription
    {
        Task<DeleteStravaWebhookSubscriptionApiContract.Result> ExecuteAsync(DeleteStravaWebhookSubscriptionApiContract contract);
    }

    public class DeleteStravaWebhookSubscriptionApiContract
    {
        public DeleteStravaWebhookSubscriptionApiContract(string clientId, string clientSecret, int subscriptionId)
        {
            ClientId = clientId;
            ClientSecret = clientSecret;
            SubscriptionId = subscriptionId;
        }

        public string ClientId { get; init; }
        public string ClientSecret { get; init; }
        public int SubscriptionId { get; init; }

        
        public class Result
        {            

            public Result(bool success, string? message = null)
            {
                Success = success;
                Message = message;
            }

            public bool  Success { get; set; }
            public string? Message { get; set; } = string.Empty;
        }


    }
}