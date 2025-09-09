using SegmentSniper.Services.StravaToken;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaApiToken
{
    public class CheckForStravaTokenActionHandler : ICheckForStravaTokenActionHandler
    {
        private readonly IGetStravaTokenForUser _getStravaTokenForUser;

        public CheckForStravaTokenActionHandler(IGetStravaTokenForUser getStravaTokenForUser)
        {
            _getStravaTokenForUser = getStravaTokenForUser;
        }

        public async Task<CheckForStravaTokenRequest.Response> HandleAsync(CheckForStravaTokenRequest request)
        {

            ValidateRequest(request);

            var result = await _getStravaTokenForUser.ExecuteAsync(new GetStravaTokenForUserContract(request.UserId));

            if (result.StravaToken != null && result.StravaToken.RefreshToken != null)
            {
                return new CheckForStravaTokenRequest.Response
                {
                    hasStravaToken = true,
                };

            }
            else
            {
                return new CheckForStravaTokenRequest.Response
                {
                    hasStravaToken = false,
                };
            }

        }

        private void ValidateRequest(CheckForStravaTokenRequest request)
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
