using AutoMapper.Configuration.Annotations;
using SegmentSniper.ApplicationLogic.ActionHandlers.Sniper;
using SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook.Factory;
using SegmentSniper.Models.Garage;
using SegmentSniper.Models.Strava.Activity;
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
        private readonly IAddBikeActivity _addBikeActivity;

        public UpdateWebhookEventHandler(IGetUserByStravaAthleteId getUserByStravaAthleteId,
                                         IDeleteBikeActivity deleteBikeActivity,
                                         IDeleteMLSegmentEffortsById deleteMLSegmentEffortsById,
                                         IGetDetailedActivityByIdActionHandler getDetailedActivityByIdActionHandler,
                                         IAddBikeActivity addBikeActivity)
        {
            _getUserByStravaAthleteId = getUserByStravaAthleteId;
            _deleteBikeActivity = deleteBikeActivity;
            _deleteMLSegmentEffortsById = deleteMLSegmentEffortsById;
            _getDetailedActivityByIdActionHandler = getDetailedActivityByIdActionHandler;
            _addBikeActivity = addBikeActivity;
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

                var activityDetails = await _getDetailedActivityByIdActionHandler.HandleAsync(new GetDetailedActivityByIdRequest(user.UserId.ToString(), payload.ObjectId.ToString()));

                if (activityDetails == null || activityDetails.DetailedActivity == null)
                {
                    Log.Error("UpdateWebhookHandler: Activity details not found for activity ID: {ActivityId}", payload.ObjectId);
                    return new WebhookEventHandlerResponse(false);
                }

                var segmentEffortIds = activityDetails.DetailedActivity.SegmentEfforts.Select(se => se.SegmentEffortId).ToList();
                var deleteMLSegmentEffortsContract = new DeleteMLSegmentEffortsByIdContract(segmentEffortIds, user.UserId.ToString());

                //re add the new bike activity:
                await _addBikeActivity.ExecuteAsync(new AddBikeActivityContract(
                    new BikeActivityModel
                    {
                        StravaActivityId = activityDetails.DetailedActivity.ActivityId,
                        UserId = user.UserId,
                        BikeId = activityDetails.DetailedActivity.GearId,
                        ActivityDate = activityDetails.DetailedActivity.StartDate,
                        DistanceInMeters = activityDetails.DetailedActivity.Distance,

                    })
                );

                //TODO recalculate the mileage on the equipment on the bike             

                scope.Complete();

                return new WebhookEventHandlerResponse(true);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error in UpdateeWebhookEventHandler.");
                return new WebhookEventHandlerResponse(false);
            }


            
            //need to query for the activity details and recreate the BiekActivity and the ML_SegmentEfforts
            throw new NotImplementedException();
        }
    }
}
