using SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook.Factory;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook.EventHandlers
{
    public class CreateWebhookEventHandler : IWebhookEventHandler
    {
        public async Task<WebhookEventHandlerResponse> HandleEventAsync(WebhookEvent payload)
        {
            throw new NotImplementedException();
        }
    }
}
