using SegmentSniper.ApplicationLogic.ActionHandlers.Sniper;
using SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook.Factory;
using SegmentSniper.Services.Garage;
using SegmentSniper.Services.MachineLearning;
using SegmentSniper.Services.User;
using Serilog;
using System.Transactions;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook.EventHandlers
{
    public class UpdateWebhookEventHandler : IWebhookEventHandler
    {
        private readonly IGetUserByStravaAthleteId _getUserByStravaAthleteId;
        private readonly IDeleteBikeActivity _deleteBikeActivity;
        private readonly IDeleteMLSegmentEffortsById _deleteMLSegmentEffortsById;
        private readonly IGetDetailedActivityByIdActionHandler _getDetailedActivityByIdActionHandler;

        public UpdateWebhookEventHandler(IGetUserByStravaAthleteId getUserByStravaAthleteId,
                                         IDeleteBikeActivity deleteBikeActivity,
                                         IDeleteMLSegmentEffortsById deleteMLSegmentEffortsById,
                                         IGetDetailedActivityByIdActionHandler getDetailedActivityByIdActionHandler)
        {
            _getUserByStravaAthleteId = getUserByStravaAthleteId;
            _deleteBikeActivity = deleteBikeActivity;
            _deleteMLSegmentEffortsById = deleteMLSegmentEffortsById;
            _getDetailedActivityByIdActionHandler = getDetailedActivityByIdActionHandler;
        }
        public async Task<WebhookEventHandlerResponse> HandleEventAsync(WebhookEvent payload)
        {
            var transactionOptions = new TransactionOptions
            {
                IsolationLevel = IsolationLevel.ReadCommitted,
                Timeout = TimeSpan.FromSeconds(30)
            };

            using var scope = new TransactionScope(TransactionScopeOption.Required, transactionOptions, TransactionScopeAsyncFlowOption.Enabled);

            try
            {
                var user = await _getUserByStravaAthleteId.ExecuteAsync(new GetUserByStravaAthleteIdContract(payload.OwnerId));

                if (user == null)
                {

                    Log.Error("User not found for Strava athlete ID: {AthleteId}", payload.OwnerId);
                    return new WebhookEventHandlerResponse(false);
                }

                var deleteBikeActivityContract = new DeleteBikeActivityContract
                {
                    UserId = user.UserId,
                    ActivityId = payload.ObjectId.ToString()
                };

                var deleteResult = await _deleteBikeActivity.ExecuteAsync(deleteBikeActivityContract);

                if (!deleteResult)
                {
                    Log.Error("UpdateWebhookHandler: Failed to delete activity with ID: {ActivityId}", payload.ObjectId);
                    return new WebhookEventHandlerResponse(false);
                }

                var activityDetails = await _getDetailedActivityByIdActionHandler.Handle(new GetDetailedActivityByIdRequest(payload.ObjectId.ToString(), user.UserId));

                if (activityDetails == null || activityDetails.DetailedActivity == null)
                {
                    Log.Error("UpdateWebhookHandler: Activity details not found for activity ID: {ActivityId}", payload.ObjectId);
                    return new WebhookEventHandlerResponse(false);
                }

                var segmentEffortIds = activityDetails.DetailedActivity.SegmentEfforts.Select(se => se.SegmentEffortId).ToList();
                var deleteMLSegmentEffortsContract = new DeleteMLSegmentEffortsByIdContract(segmentEffortIds, user.UserId);

                scope.Complete();

                return new WebhookEventHandlerResponse(true);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error in UpdateeWebhookEventHandler.");
                return new WebhookEventHandlerResponse(false);
            }

            //need to delete the existing bikeactivity and then create a new one with the updated data

            //need to delete the existing ML segment efforts and then create new ones with the updated data
            throw new NotImplementedException();
        }
    }
}
