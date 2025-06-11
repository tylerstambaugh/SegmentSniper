namespace StravaApiClient.Services.Webhook
{
    public interface ICreateStravaWebhookSubscription
    {
        Task<CreateStravaWebhookSubscriptionContract.Result> ExecuteAsync(CreateStravaWebhookSubscriptionContract contract);
    }

    public class CreateStravaWebhookSubscriptionContract
    {
        public string VerifyToken { get; init; }
        public string CallbackUrl { get; init; }
        public string ClientId { get; init; }
        public string ClientSecret { get; init; }

        public CreateStravaWebhookSubscriptionContract(string verifyToken, string callbackUrl, string clientId, string clientSecret)
        {
            VerifyToken = verifyToken ?? throw new ArgumentNullException(nameof(verifyToken));
            CallbackUrl = callbackUrl ?? throw new ArgumentNullException(nameof(callbackUrl));
            ClientId = clientId ?? throw new ArgumentNullException(nameof(clientId));
            ClientSecret = clientSecret ?? throw new ArgumentNullException(nameof(clientSecret));
        }
        public class Result
        {
            public int It { get; init; }
        }
    }

    public class CreateStravaWebhookSubscriptionData
    {
        public CreateStravaWebhookSubscriptionData(string verifyToken, string callbackUrl, string clientId, string clientSecret)
        {
            VerifyToken = verifyToken ?? throw new ArgumentNullException(nameof(verifyToken));
            CallbackUrl = callbackUrl ?? throw new ArgumentNullException(nameof(callbackUrl));
            ClientId = clientId ?? throw new ArgumentNullException(nameof(clientId));
            ClientSecret = clientSecret ?? throw new ArgumentNullException(nameof(clientSecret));
        }
        public string VerifyToken { get; set; }
        public string CallbackUrl { get; set; }
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
    }
}
