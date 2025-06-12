namespace SegmentSniper.Services.StravaWebhook
{
    public interface IDeleteStravaWebhookSubscriptionService
    {
        Task<DeleteStravaWebhookSubscriptionContract.Result> ExecuteAsync(DeleteStravaWebhookSubscriptionContract contract);
    }
}