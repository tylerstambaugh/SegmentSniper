using StravaApiClient.Services.Webhook;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook
{
    public class CreateStravaWebhookSubscription
    {
        private readonly ICreateStravaWebhookSubscription _createStravaWebhookSubscription;

        public CreateStravaWebhookSubscription(ICreateStravaWebhookSubscription createStravaWebhookSubscription)
        {
            _createStravaWebhookSubscription = createStravaWebhookSubscription;
        }
    }
}
