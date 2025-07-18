using Microsoft.Extensions.DependencyInjection;
using SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook.EventHandlers;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook.Factory
{
    public class WebhookEventHandlerFactory
    {
        private readonly IServiceProvider _serviceProvider;


        public WebhookEventHandlerFactory(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

#pragma warning disable CS8603 // Possible null reference return.
        public IWebhookEventHandler GetHandler(string eventType) => eventType switch
        {
            "create" => _serviceProvider.GetService<CreateWebhookEventHandler>(),
            "update" => _serviceProvider.GetService<UpdateWebhookEventHandler>(),
            //"delete" => _serviceProvider.GetRequiredService<IDeleteWebhookEventHandler>(),
            _ => throw new NotSupportedException($"Event type '{eventType}' is not supported.")
        };
#pragma warning restore CS8603 // Possible null reference return.
    }
}
