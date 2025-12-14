using SegmentSniper.ApplicationLogic.ActionHandlers.Sniper;
using SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook.Factory;
using SegmentSniper.Services.Garage;
using SegmentSniper.Services.MachineLearning;
using SegmentSniper.Services.User;
using Serilog;
using System.Transactions;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook.EventHandlers
{
    public class DeleteWebhookEventHandler : IWebhookEventHandler
    {
        private readonly IGetUserByStravaAthleteId _getUserByStravaAthleteId;
        private readonly IDeleteBikeActivity _deleteBikeActivity;
        private readonly IDeleteMLSegmentEffortsByActivityId _deleteMLSegmentEffortsByActivityId;
        private readonly IGetDetailedActivityByIdActionHandler _getDetailedActivityByIdActionHandler;

        public DeleteWebhookEventHandler(IGetUserByStravaAthleteId getUserByStravaAthleteId, 
                                         IDeleteBikeActivity deleteBikeActivity, 
                                         IDeleteMLSegmentEffortsByActivityId deleteMLSegmentEffortsByActivityId,
                                         IGetDetailedActivityByIdActionHandler getDetailedActivityByIdActionHandler)
        {
            _getUserByStravaAthleteId = getUserByStravaAthleteId;
            _deleteBikeActivity = deleteBikeActivity;
            _deleteMLSegmentEffortsByActivityId = deleteMLSegmentEffortsByActivityId;
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
                    Log.Error("DeleteWebhookHandler: Failed to delete activity with ID: {ActivityId}", payload.ObjectId);
                    return new WebhookEventHandlerResponse(false);
                }

                var deleteMLSegmentEffortsContract = new DeleteMLSegmentEffortsByActivityIdContract(deleteBikeActivityContract.ActivityId, user.UserId.ToString());                

                scope.Complete(); 

                return new WebhookEventHandlerResponse(true);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error in DeleteWebhookEventHandler.");
                return new WebhookEventHandlerResponse(false);
            }
        }
    }
}
