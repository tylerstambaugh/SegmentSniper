using SegmentSniper.ApplicationLogic.ActionHandlers.Sniper;
using SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook.Factory;
using SegmentSniper.Services.User;

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
            //need to look up the athlete

            //need to get the activity details from strava

            // need to update the bikeActivity table with the details

            try
            {
                var user = await _getUserByStravaAthleteId.ExecuteAsync(new GetUserByStravaAthleteIdContract(payload.OwnerId));

                if(user == null)
                {
                    // Log or handle the case where the user is not found
                    // For example, you might want to log this as an error
                    // _logger.LogError("User not found for Strava athlete ID: {AthleteId}", payload.OwnerId);
                    return new WebhookEventHandlerResponse(false);
                }

                var activityDetails = await _getDetailedActivityByIdActionHandler.Handle(new GetDetailedActivityByIdRequest(payload.ObjectId.ToString(), user.UserId));

                if(activityDetails == null || activityDetails.DetailedActivity == null)
                {
                    // Log or handle the case where the activity details are not found
                    // _logger.LogError("Activity details not found for activity ID: {ActivityId}", payload.ObjectId);
                    return new WebhookEventHandlerResponse(false);
                }

                return new WebhookEventHandlerResponse(true);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                // For example, you might want to log it to a logging service
                // _logger.LogError(ex, "Error retrieving user by Strava athlete ID.");
                throw;
            }







            return new WebhookEventHandlerResponse(false);

            
        }
    }
}
