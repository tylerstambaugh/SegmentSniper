using Duende.IdentityServer.Validation;
using StravaApiClient.Services.Webhook;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook
{
    public class ViewStravaWebhookSubscriptionHandler : IViewStravaWebhookSubscriptionHandler
    {
        private readonly IViewStravaWebhookSubscription _viewStravaWebhookSubscription;

        public ViewStravaWebhookSubscriptionHandler(IViewStravaWebhookSubscription viewStravaWebhookSubscription)
        {
            _viewStravaWebhookSubscription = viewStravaWebhookSubscription;
        }

        public async Task<ViewStravaWebhookSubscriptionRequest.Response> HandleAsync(ViewStravaWebhookSubscriptionRequest request)
        {
            ValidatedRequest(request);
            return await _viewStravaWebhookSubscription.ExecuteAsync(contract);
        }
    }
