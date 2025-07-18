using SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook.EventHandlers;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook.Factory
{
    public interface IWebhookEventHandler
    {
       Task<WebhookEventHandlerResponse> HandleEventAsync(WebhookEvent payload);
    }
}
