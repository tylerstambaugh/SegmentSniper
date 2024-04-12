using Duende.IdentityServer.Validation;
using SegmentSniper.Models.UIModels.ManageProfile;
using SegmentSniper.Services.ManageProfile;

namespace SegmentSniper.Api.ActionHandlers.ManageProfileActionHandlers
{
    public class UpdateEmailAddressAsyncActionHandler : IUpdateEmailAddressAsyncActionHandler
    {
        private readonly IUpdateEmailAddressAsync _updateEmailAddressAsync;

        public UpdateEmailAddressAsyncActionHandler(IUpdateEmailAddressAsync updateEmailAddressAsync)
        {
            _updateEmailAddressAsync = updateEmailAddressAsync;
        }

        public async Task <UpdateEmailAddressAsyncRequest.Response> HandleAsync(UpdateEmailAddressAsyncRequest request)
        {
            ValidatedRequest(request);

            //need to send email with code.

            //need to have user reply with code

            //need to verify code

            try
            {


                var contract = new UpdateEmailAddressAsyncContract(request.UserId, request.EmailAddress);
                var result = await _updateEmailAddressAsync.ExecuteAsync(contract);

                if (result != null)
                {
                    var applicationUser = result.UpdatedUser.ApplicationUser;
                    var stravaToken = result.UpdatedUser.StravaApiToken;
                    return new UpdateEmailAddressAsyncRequest.Response
                    {
                        UpdatedUser = new UserProfileUiModel
                        {
                            Email = applicationUser.Email,
                            UserName = applicationUser.UserName,
                            UserId = applicationUser.Id,
                            FirstName = applicationUser.FirstName,
                            HasStravaToken = stravaToken != null,
                            StravaRefreshToken = stravaToken?.RefreshToken,
                            StravaTokenExpiresAt = stravaToken != null ? DateTimeOffset.FromUnixTimeSeconds(result.UpdatedUser.StravaApiToken.ExpiresAt).DateTime : (DateTime?)null,
                            LastLogin = applicationUser.LastLogin,
                        }
                    };
                }
                else
                {
                    return new UpdateEmailAddressAsyncRequest.Response
                    {
                        UpdatedUser = null
                    };
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error updating email address", ex);
            }
        }

        private void ValidatedRequest(UpdateEmailAddressAsyncRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }
            if (string.IsNullOrWhiteSpace(request.UserId))
            {
                throw new ArgumentNullException(nameof(request.UserId));
            }
            if (string.IsNullOrWhiteSpace(request.EmailAddress))
            {
                throw new ArgumentNullException(nameof(request.EmailAddress));
            }
        }
    }
}
