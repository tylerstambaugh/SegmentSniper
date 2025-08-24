using SegmentSniper.Services.ManageProfile;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.ManageProfile
{
    public class RevokeStravaTokenAsyncActionHandler : IRevokeStravaTokenAsyncActionHandler
    {
        private readonly IDeleteStravaTokenAsync _deleteStravaTokenAsync;

        public RevokeStravaTokenAsyncActionHandler(IDeleteStravaTokenAsync deleteStravaTokenAsync)
        {
            _deleteStravaTokenAsync = deleteStravaTokenAsync;
        }

        public async Task<RevokeStravaTokenAsyncActionHandlerRequest.Response> HandleAsync(RevokeStravaTokenAsyncActionHandlerRequest request)
        {
            ValidatedRequest(request);

            try
            {
                var result = await _deleteStravaTokenAsync.ExecuteAsync(new DeleteStravaTokenContract(request.UserId));

                return new RevokeStravaTokenAsyncActionHandlerRequest.Response(result.Success);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Unable to revoke Strava token", ex);
            }
        }

        private void ValidatedRequest(RevokeStravaTokenAsyncActionHandlerRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }
            if (string.IsNullOrWhiteSpace(request.UserId))
            {
                throw new ArgumentNullException(nameof(request.UserId));
            }
        }
    }
}
