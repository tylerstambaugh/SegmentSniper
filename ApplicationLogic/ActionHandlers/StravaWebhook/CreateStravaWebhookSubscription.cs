using Microsoft.Extensions.Configuration;
using StravaApiClient.Services.Webhook;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook
{
    public class CreateStravaWebhookSubscription
    {
        private readonly ICreateStravaWebhookSubscription _createStravaWebhookSubscription;
        private readonly IConfiguration _configuration;

        public CreateStravaWebhookSubscription(ICreateStravaWebhookSubscription createStravaWebhookSubscription, ICreateStravaWebhookSubscription createStravaWebhookSubscriptionService, IConfiguration configuration)
        {
            _createStravaWebhookSubscription = createStravaWebhookSubscription;
            CreateStravaWebhookSubscriptionService = createStravaWebhookSubscriptionService;
            _configuration = configuration;
        }

        public ICreateStravaWebhookSubscription CreateStravaWebhookSubscriptionService { get; }

        public async Task<bool> ExecuteAsync()
        {
            var stravaResponse = _createStravaWebhookSubscription.ExecuteAsync(new CreateStravaWebhookSubscriptionContract())
        }
    }
}
