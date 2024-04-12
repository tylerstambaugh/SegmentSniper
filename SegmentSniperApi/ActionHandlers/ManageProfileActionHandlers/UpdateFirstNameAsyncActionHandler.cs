using SegmentSniper.Models.UIModels.ManageProfile;
using SegmentSniper.Services.ManageProfile;

namespace SegmentSniper.Api.ActionHandlers.ManageProfileActionHandlers
{
    public class UpdateFirstNameAsyncActionHandler : IUpdateFirstNameAsyncActionHandler
    {
        private readonly IUpdateFirstNameAsync _updateFirstName;

        public UpdateFirstNameAsyncActionHandler(IUpdateFirstNameAsync updateFirstName)
        {
            _updateFirstName = updateFirstName;
        }
        public async Task<UpdateFirstNameRequest.Response> HandleAsync(UpdateFirstNameRequest request)
        {
            ValidateRequest(request);

            try
            {
                var contract = new UpdateFirstNameContract(request.UserId, request.FirstName);
                var result = await _updateFirstName.ExecuteAsync(contract);

                if (result != null)
                {
                    var applicationUser = result.UpdatedUser.ApplicationUser;
                    var stravaToken = result.UpdatedUser.StravaApiToken;
                    return new UpdateFirstNameRequest.Response
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
                    return new UpdateFirstNameRequest.Response
                    {
                        UpdatedUser = null
                    };
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error updating first name", ex);
            }
        }

        private void ValidateRequest(UpdateFirstNameRequest request)
        {
           if(request == null)
           {
               throw new ArgumentNullException(nameof(request));
           }
           if(string.IsNullOrWhiteSpace(request.UserId))
           {
               throw new ArgumentNullException(nameof(request.UserId));
           }
           if(string.IsNullOrWhiteSpace(request.FirstName))
           {
                throw new ArgumentNullException(nameof(request.FirstName));
           }
        }
    }
}
