using SegmentSniper.Services.StravaToken;
using static SegmentSniper.Api.ActionHandlers.StravaApiToken.ICheckForStravaTokenActionHandler;

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
            var refreshToken = _getStravaTokenForUser.Execute(new GetStravaTokenForUserContract(request.UserId)).StravaToken.RefreshToken;

            return new CheckForStravaTokenRequest.Response
            {
                hasStravaToken = refreshToken != null,
            };
        }
    }
}
