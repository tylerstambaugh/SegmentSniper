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
        private readonly IBikeActivityQueuePublisher _bikeActivityQueuePublisher;
        private string _userId;

        public UpdateWebhookEventHandler(IGetUserByStravaAthleteId getUserByStravaAthleteId,
                                         IDeleteBikeActivity deleteBikeActivity,
                                         IDeleteMLSegmentEffortsById deleteMLSegmentEffortsById,
                                         IGetDetailedActivityByIdActionHandler getDetailedActivityByIdActionHandler,
                                         IAddBikeActivity addBikeActivity,
                                         IBikeActivityQueuePublisher bikeActivityQueuePublisher)
        {
            _getUserByStravaAthleteId = getUserByStravaAthleteId;
            _deleteBikeActivity = deleteBikeActivity;
            _deleteMLSegmentEffortsById = deleteMLSegmentEffortsById;
            _getDetailedActivityByIdActionHandler = getDetailedActivityByIdActionHandler;
            _addBikeActivity = addBikeActivity;
            _bikeActivityQueuePublisher = bikeActivityQueuePublisher;
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

                _userId = user.UserId;

                var deleteBikeActivityContract = new DeleteBikeActivityContract
                {
                    UserId = _userId,
                    ActivityId = payload.ObjectId.ToString()
                };

                var deleteResult = await _deleteBikeActivity.ExecuteAsync(deleteBikeActivityContract);

                if (!deleteResult)
                {
                    Log.Error("UpdateWebhookHandler: Failed to delete activity with ID: {ActivityId}", payload.ObjectId);
                    return new WebhookEventHandlerResponse(false);
                }

                var activityDetails = await _getDetailedActivityByIdActionHandler.HandleAsync(new GetDetailedActivityByIdRequest(_userId.ToString(), payload.ObjectId.ToString()));

                if (activityDetails == null || activityDetails.DetailedActivity == null)
                {
                    Log.Error("UpdateWebhookHandler: Activity details not found for activity ID: {ActivityId}", payload.ObjectId);
                    return new WebhookEventHandlerResponse(false);
                }

                var segmentEffortIds = activityDetails.DetailedActivity.SegmentEfforts.Select(se => se.SegmentEffortId).ToList();
                var deleteMLSegmentEffortsContract = new DeleteMLSegmentEffortsByIdContract(segmentEffortIds, _userId.ToString());

                //re add the new bike activity:
                await _addBikeActivity.ExecuteAsync(new AddBikeActivityContract(
                    new BikeActivityModel
                    {
                        StravaActivityId = activityDetails.DetailedActivity.ActivityId,
                        UserId = _userId,
                        BikeId = activityDetails.DetailedActivity.GearId,
                        ActivityDate = activityDetails.DetailedActivity.StartDate,
                        DistanceInMeters = activityDetails.DetailedActivity.Distance,
                    })
                );
            
                //should update the total miles on the equipment on the bike too.
                try
                {

                    await _bikeActivityQueuePublisher.PublishMessageAsync(new BikeActivityQueueMessage
                    {
                        AuthUserId = _userId,
                        BikeId = activityDetails.DetailedActivity.GearId
                    });
                }
                catch (Exception ex)
                {
                    Log.Error(ex, "Error publishing bike activity queue message for user {UserId} and bike {BikeId}", _userId, activityDetails.DetailedActivity.GearId);
                }
                scope.Complete();

                return new WebhookEventHandlerResponse(true);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error in UpdateeWebhookEventHandler.");
                return new WebhookEventHandlerResponse(false);
            }
                        
            //TODO need to query for the activity details and recreate the BiekActivity and the ML_SegmentEfforts
           
        }
    }
}
