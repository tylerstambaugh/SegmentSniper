using SegmentSniper.Models.UIModels.ManageProfile;
using SegmentSniper.Services.ManageProfile;

namespace SegmentSniper.Api.ActionHandlers.ManageProfileActionHandlers
{
    public class GetProfileActionHandler : IGetProfileActionHandler
    {
        private readonly IGetProfile _getProfile;

        public GetProfileActionHandler(IGetProfile getProfile)
        {
            _getProfile = getProfile;
        }

        public async Task<GetProfileRequest.Response> HandleAsync(GetProfileRequest request)
        {
            ValidateRequest(request);

            try
            {
                var contract = new GetProfileContract(request.UserId);
                var result = await _getProfile.ExecuteAsync(contract);

                if (result != null)
                {

                    var user = result.Profile.ApplicationUser;
                    var stravaToken = result.Profile.StravaApiToken;
                    DateTimeOffset stravaTokenExpirationDateTimeoffset = DateTimeOffset.FromUnixTimeSeconds(stravaToken.ExpiresAt);
                    return new GetProfileRequest.Response
                    {
                        UserProfile = new UserProfileUiModel
                        {
                            Email = user.Email,
                            UserName = user.UserName,
                            FirstName = user.FirstName,
                            HasStravaToken = stravaToken != null,
                            StravaTokenExpiresAt = stravaTokenExpirationDateTimeoffset.DateTime,                            
                        }
                    };
                }
                else
                {
                    return new GetProfileRequest.Response
                    {
                        UserProfile = null
                    };
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error getting profile", ex);
            }
        }

        public void ValidateRequest(GetProfileRequest request)
        {
            if (string.IsNullOrEmpty(request.UserId))
            {
                throw new ArgumentException("UserId is required");
            }
        }
    }
}
