using SegmentSniper.Services.ManageProfile;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.ManageProfile
{
    public class UpdatePasswordAsyncActionHandler : IUpdatePasswordAsyncActionHandler
    {
        private readonly IUpdatePasswordAsync _updatePasswordAsync;

        public UpdatePasswordAsyncActionHandler(IUpdatePasswordAsync updatePasswordAsync)
        {
            _updatePasswordAsync = updatePasswordAsync;
        }

        public async Task<UpdatePasswordRequest.Response> HandleAsync(UpdatePasswordRequest request)
        {
            ValidatedRequest(request);
            try
            {
                var result = await _updatePasswordAsync.ExecuteAsync(new UpdatePasswordAsyncContract(request.CurrentPassword, request.NewPassword, request.UserId));

                return new UpdatePasswordRequest.Response
                {
                    Success = result.Success,
                };
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Unable to update password", ex);
            }
        }

        private void ValidatedRequest(UpdatePasswordRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }
            if (string.IsNullOrWhiteSpace(request.UserId))
            {
                throw new ArgumentNullException(nameof(request.UserId));
            }
            if (string.IsNullOrWhiteSpace(request.NewPassword))
            {
                throw new ArgumentNullException(nameof(request.NewPassword));
            }
            if (string.IsNullOrWhiteSpace(request.CurrentPassword))
            {
                throw new ArgumentNullException(nameof(request.CurrentPassword));
            }
        }
    }
}
