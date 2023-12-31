using SegmentSniper.Models.Models.Auth;
using SegmentSniper.Models.Models.Auth.User;
using SegmentSniper.Services.AuthServices;
using SegmentSniper.Services.StravaToken;
using static SegmentSniper.Services.AuthServices.IGetAuthenticatedUser;
using static SegmentSniper.Services.AuthServices.IRefreshToken;

namespace SegmentSniper.Api.ActionHandlers.AuthActionHandlers
{
    public class ConfirmEmailActionHandler : IConfirmEmailActionHandler
    {
        private readonly IConfirmEmail _confirmEmail;
        private readonly IRefreshToken _refresh;
        private readonly IGetAuthenticatedUser _getAuthenticatedUser;
        private readonly IGetStravaTokenForUser _getStravaTokenForUser;

        public ConfirmEmailActionHandler(IConfirmEmail confirmEmail, IRefreshToken refresh, IGetAuthenticatedUser getAuthenticatedUser, IGetStravaTokenForUser getStravaTokenForUser)
        {
            _confirmEmail = confirmEmail;
            _refresh = refresh;
            _getAuthenticatedUser = getAuthenticatedUser;
            _getStravaTokenForUser = getStravaTokenForUser;
        }

        public async Task<ConfirmEmailRequest.Response> HandleAsync(ConfirmEmailRequest request)
        {
            ValidatedRequest(request);

            try
            {

                var result = await _confirmEmail.Execute(new ConfirmEmailContract
                {
                    UserId = request.UserId,
                    ConfirmationToken = request.ConfirmationToken,
                });

                var userData = await _getAuthenticatedUser.ExecuteAsync(new GetAuthenticatedUserContract(request.UserId));
                var hasStravaTokenData = (_getStravaTokenForUser.Execute(new GetStravaTokenForUserContract(request.UserId)).StravaToken != null);

                var userDto = new UserDto
                {
                    Id = userData.LoggedInUser.Id,
                    FirstName = userData.LoggedInUser.FirstName,
                    Email = userData.LoggedInUser.Email,
                    HasStravaTokenData = hasStravaTokenData,
                    VerifiedEmail = userData.LoggedInUser.EmailConfirmed,
                    Roles = userData.Roles,
                };

               // var newTokenData = await _refresh.Execute(new RefreshTokenContract(new RefreshTokenData(request.RefreshToken, request.AccessToken)));

                return new ConfirmEmailRequest.Response
                {
                    Success = result,
                    //TokenData = newTokenData.RefreshedToken,
                    UserData = userDto
                };
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error while confirming email:", ex);
            }
        }

        private void ValidatedRequest(ConfirmEmailRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            if (string.IsNullOrWhiteSpace(request.ConfirmationToken))
            {
                throw new ArgumentException(nameof(request.ConfirmationToken));
            }


            if (string.IsNullOrWhiteSpace(request.AccessToken))
            {
                throw new ArgumentException(nameof(request.AccessToken));
            }

            if (string.IsNullOrWhiteSpace(request.RefreshToken))
            {
                throw new ArgumentException(nameof(request.RefreshToken));
            }

            if (string.IsNullOrWhiteSpace(request.UserId))
            {
                throw new ArgumentException(nameof(request.UserId));
            }
        }
    }
}
