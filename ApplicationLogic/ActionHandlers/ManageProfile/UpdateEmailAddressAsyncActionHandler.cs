using SegmentSniper.Models.UIModels.ManageProfile;
using SegmentSniper.Services.ManageProfile;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.ManageProfile
{
    public class UpdateEmailAddressAsyncActionHandler : IUpdateEmailAddressAsyncActionHandler
    {
        private readonly IVerifyCodeForEmailAddressChange _verifyCodeForEmailAddressChange;
        private readonly IUpdateEmailAddressAsync _updateEmailAddressAsync;

        public UpdateEmailAddressAsyncActionHandler(IVerifyCodeForEmailAddressChange verifyCodeForEmailAddressChange, IUpdateEmailAddressAsync updateEmailAddressAsync)
        {
            _verifyCodeForEmailAddressChange = verifyCodeForEmailAddressChange;
            _updateEmailAddressAsync = updateEmailAddressAsync;
        }

        public async Task<UpdateEmailAddressAsyncRequest.Response> HandleAsync(UpdateEmailAddressAsyncRequest request)
        {
            ValidatedRequest(request);

            var verifiedCode = _verifyCodeForEmailAddressChange.Execute(new VerifyCodeForEmailAddressChangeContract(request.UserId, request.VerificationCode)).CorrectCode;
            if (!verifiedCode)
            {
                throw new ArgumentException("Incorrect verification code. Please try again");
            }

            try
            {
                var contract = new UpdateEmailAddressAsyncContract(request.UserId, request.EmailAddress);
                var result = await _updateEmailAddressAsync.ExecuteAsync(contract);

                if (result != null)
                {
                    var applicationUser = result.ProfileData.ApplicationUser;
                    var stravaToken = result.ProfileData.StravaApiToken;
                    return new UpdateEmailAddressAsyncRequest.Response
                    {
                        ProfileData = new UserProfileUiModel
                        {
                            Email = applicationUser.Email,
                            UserName = applicationUser.UserName,
                            UserId = applicationUser.Id,
                            FirstName = applicationUser.FirstName,
                            HasStravaToken = stravaToken != null,
                            StravaRefreshToken = stravaToken?.RefreshToken,
                            StravaTokenExpiresAt = stravaToken != null ? DateTimeOffset.FromUnixTimeSeconds(result.ProfileData.StravaApiToken.ExpiresAt).DateTime : (DateTime?)null,
                            LastLogin = applicationUser.LastLogin,
                        },
                    };
                }
                else
                {
                    return new UpdateEmailAddressAsyncRequest.Response
                    {
                        ProfileData = null
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
            if (request.VerificationCode <= 0)
            {
                throw new ArgumentException(nameof(request.VerificationCode));
            }
        }
    }
}
