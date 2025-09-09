using SegmentSniper.ApplicationLogic.ActionHandlers.Sniper;
using SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook.Factory;
using SegmentSniper.Services.User;
using Serilog;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook.EventHandlers
{
    public class CreateWebhookEventHandler : IWebhookEventHandler
    {
        private readonly IGetUserByStravaAthleteId _getUserByStravaAthleteId;
        private readonly IGetDetailedActivityByIdActionHandler _getDetailedActivityByIdActionHandler;

        public CreateWebhookEventHandler(IGetUserByStravaAthleteId getUserByStravaAthleteId, IGetDetailedActivityByIdActionHandler getDetailedActivityByIdActionHandler)
        {
            _getUserByStravaAthleteId = getUserByStravaAthleteId;
            _getDetailedActivityByIdActionHandler = getDetailedActivityByIdActionHandler;
        }
        public async Task<WebhookEventHandlerResponse> HandleEventAsync(WebhookEvent payload)
        {

            try
            {
                var user = await _getUserByStravaAthleteId.ExecuteAsync(new GetUserByStravaAthleteIdContract(payload.OwnerId));

                if(user == null)
                {
                 
                    Log.Error("User not found for Strava athlete ID: {AthleteId}", payload.OwnerId);
                    return new WebhookEventHandlerResponse(false);
                }

                var activityDetails = await _getDetailedActivityByIdActionHandler.HandleAsync(new GetDetailedActivityByIdRequest(user.UserId.ToString(), payload.ObjectId.ToString()));

                if(activityDetails == null || activityDetails.DetailedActivity == null)
                {                 
                    Log.Error("CreateWebhookHandler: Activity details not found for activity ID: {ActivityId}", payload.ObjectId);
                    return new WebhookEventHandlerResponse(false);
                }

                return new WebhookEventHandlerResponse(true);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error in CreateWebhookEventHandler.");
                return new WebhookEventHandlerResponse(false);
            }
        }
    }
}
