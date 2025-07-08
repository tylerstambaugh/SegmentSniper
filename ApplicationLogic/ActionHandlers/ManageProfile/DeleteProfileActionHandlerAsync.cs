using SegmentSniper.Services.Admin;
using SegmentSniper.Services.ManageProfile;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.ManageProfile
{
    public class DeleteProfileActionHandlerAsync : IDeleteProfileActionHandlerAsync
    {
        private readonly IDeleteStravaTokenAsync _deleteStravaToken;
        private readonly IRemoveUser _removeUser;

        public DeleteProfileActionHandlerAsync
            (IDeleteStravaTokenAsync deleteStravaToken, IRemoveUser removeUser)
        {
            _deleteStravaToken = deleteStravaToken;
            _removeUser = removeUser;
        }

        public async Task<DeleteProfileAsyncRequest.Response> HandleAsync(DeleteProfileAsyncRequest request)
        {
            ValidateRequest(request);

            try
            {
                var stravaTokenWasDeleted = await _deleteStravaToken.ExecuteAsync(new DeleteStravaTokenContract(request.UserId));
            }
            catch (Exception ex) { }


            var userWasDeleted = await _removeUser.ExecuteAsync(new RemoveUserContract(request.UserId));

            return new DeleteProfileAsyncRequest.Response(userWasDeleted.Success);
        }

        private void ValidateRequest(DeleteProfileAsyncRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            if (string.IsNullOrEmpty(request.UserId))
            {
                throw new ArgumentException("UserId is required");
            }
        }
    }
}
