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
            public int SubscriptionId { get; set; }
            public Result(int subscriptionId)
            {
                SubscriptionId = subscriptionId;
            }
        }
    }
}