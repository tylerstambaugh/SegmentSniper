namespace SegmentSniper.Services.StravaWebhook
{
    public interface ISaveStravaWebhookSubscriptionId
    {
        Task<SaveStravaWebhookSubscriptionIdContract.Result> ExecuteAsync(SaveStravaWebhookSubscriptionIdContract contract);
    }

    public class SaveStravaWebhookSubscriptionIdContract
    {

        public int StravaWebhookSubscriptionId { get; set; }
        public class Result
        {
            public bool Success { get; set; }
            public Result(bool success)
            {
                Success = success;
            }
        }
    }
}