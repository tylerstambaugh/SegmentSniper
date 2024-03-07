using SegmentSniper.Services.StravaToken;

namespace SegmentSniper.Api.ActionHandlers.StravaApiToken
{
    public class CheckForStravaTokenActionHandler : ICheckForStravaTokenActionHandler
    {
        private readonly IGetStravaTokenForUser _getStravaTokenForUser;

        public CheckForStravaTokenActionHandler(IGetStravaTokenForUser getStravaTokenForUser)
        {
            _getStravaTokenForUser = getStravaTokenForUser;
        }

        public CheckForStravaTokenRequest.Response Handle(CheckForStravaTokenRequest request)
        {

            ValidateRequest(request);

            var result = _getStravaTokenForUser.Execute(new GetStravaTokenForUserContract(request.UserId));

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
