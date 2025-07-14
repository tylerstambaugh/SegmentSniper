
namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook
{
    public interface IProcessWebhookUpdate
    {
        Task<bool> HandleAsync(WebhookUpdate webhookUpdate);
    }
}