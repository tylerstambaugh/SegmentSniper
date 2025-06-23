namespace SegmentSniper.Services.StravaWebhook
{
    public interface IGetStravaWebhookSubscriptionId
    {
        Task<GetStravaWebhookSubscriptionIdContract.Result> ExecuteAsync(GetStravaWebhookSubscriptionIdContract contract);
    }

    public class GetStravaWebhookSubscriptionIdContract
    {
        public class Result
        {
            public string SubscriptionId { get; set; }
            public Result(string subscriptionId)
            {
                SubscriptionId = subscriptionId ?? throw new ArgumentNullException(nameof(subscriptionId));
            }
        }
    }
}