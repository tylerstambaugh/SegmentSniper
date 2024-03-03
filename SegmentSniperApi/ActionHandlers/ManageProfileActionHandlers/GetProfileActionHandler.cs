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
            
            var contract = new GetProfileContract(request.userId);
            var result = await _getProfile.ExecuteAsync(contract);
            
        }

        public void ValidateRequest(GetProfileRequest request)
        {
            if (string.IsNullOrEmpty(request.userId))
            {
                throw new ArgumentException("UserId is required");
            }
        }
    }
}
