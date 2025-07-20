using SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook.Factory;
using SegmentSniper.Services.User;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook.EventHandlers
{
    public class DeleteWebhookEventHandler : IWebhookEventHandler
    {
        private readonly IGetUserByStravaAthleteId _getUserByStravaAthleteId;

        public DeleteWebhookEventHandler(IGetUserByStravaAthleteId getUserByStravaAthleteId)
        {
            _getUserByStravaAthleteId = getUserByStravaAthleteId;
        }
        public Task<WebhookEventHandlerResponse> HandleEventAsync(WebhookEvent payload)
        {

            

            // will need to look up the user based on the payload.OwnerId
            throw new NotImplementedException();
        }
    }
}
