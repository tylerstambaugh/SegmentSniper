namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook.Factory
{
    public class WebhookEventHandlerFactory
    {
        private readonly IServiceProvider _serviceProvider;


        public WebhookEventHandlerFactory(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }
    }
}
