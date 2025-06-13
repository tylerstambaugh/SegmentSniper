
using StravaApiClient.Services.Webhook;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook
{
    public interface ICreateStravaWebhookSubscriptionHandler
    {      

        Task<bool> ExecuteAsync();
    }
}