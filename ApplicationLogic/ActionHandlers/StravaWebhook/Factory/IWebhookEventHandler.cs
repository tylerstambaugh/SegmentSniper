namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook.Factory
{
    public interface IWebhookEventHandler
    {
        Task HandleEventAsync(WebhookEvent payload);
    }
}
