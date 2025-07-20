using SegmentSniper.ApplicationLogic.ActionHandlers.Sniper;
using SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook.Factory;
using SegmentSniper.Services.Garage;
using SegmentSniper.Services.User;
using Serilog;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook.EventHandlers
{
    public class DeleteWebhookEventHandler : IWebhookEventHandler
    {
        private readonly IGetUserByStravaAthleteId _getUserByStravaAthleteId;
        private readonly IDeleteBikeActivity _deleteBikeActivity;

        public DeleteWebhookEventHandler(IGetUserByStravaAthleteId getUserByStravaAthleteId, IDeleteBikeActivity deleteBikeActivity)
        {
            _getUserByStravaAthleteId = getUserByStravaAthleteId;
            _deleteBikeActivity = deleteBikeActivity;
        }
        public async Task<WebhookEventHandlerResponse> HandleEventAsync(WebhookEvent payload)
        {

            try
            {
                var user = await _getUserByStravaAthleteId.ExecuteAsync(new GetUserByStravaAthleteIdContract(payload.OwnerId));

                if (user == null)
                {

                    Log.Error("User not found for Strava athlete ID: {AthleteId}", payload.OwnerId);
                    return new WebhookEventHandlerResponse(false);
                }

                var deleteContract = new DeleteBikeActivityContract
                {
                    UserId = user.UserId,
                    ActivityId = payload.ObjectId.ToString()
                };

                var deleteResult = await _deleteBikeActivity.ExecuteAsync(deleteContract);

                if (!deleteResult)
                {
                    Log.Error("DeleteWebhookHandler: Failed to delete activity with ID: {ActivityId}", payload.ObjectId);
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
