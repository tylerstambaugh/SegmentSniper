﻿using SegmentSniper.Models.Models.Auth.User;
using SegmentSniper.Services.AuthServices;
using SegmentSniper.Services.StravaToken;
using static SegmentSniper.Services.AuthServices.IGetAuthenticatedUser;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.Authentication
{
    public class ConfirmEmailActionHandler : IConfirmEmailActionHandler
    {
        private readonly IConfirmEmail _confirmEmail;
        private readonly IGetAuthenticatedUser _getAuthenticatedUser;
        private readonly IGetStravaTokenForUser _getStravaTokenForUser;

        public ConfirmEmailActionHandler(IConfirmEmail confirmEmail, IGetAuthenticatedUser getAuthenticatedUser, IGetStravaTokenForUser getStravaTokenForUser)
        {
            _confirmEmail = confirmEmail;
            _getAuthenticatedUser = getAuthenticatedUser;
            _getStravaTokenForUser = getStravaTokenForUser;
        }

        public async Task<ConfirmEmailRequest.Response> HandleAsync(ConfirmEmailRequest request)
        {
            ValidatedRequest(request);

            try
            {

                var result = await _confirmEmail.ExecuteAsync(new ConfirmEmailContract(request.UserId ?? throw new ApplicationException(), request.ConfirmationToken));

                var userData = await _getAuthenticatedUser.ExecuteAsync(new GetAuthenticatedUserContract(request.UserId));
                var hasStravaTokenDataResult = (await _getStravaTokenForUser.ExecuteAsync(new GetStravaTokenForUserContract(request.UserId)));

                var hasStravaTokenData = hasStravaTokenDataResult.StravaToken != null;

                var userDto = new UserDto
                {
                    Id = userData.LoggedInUser.Id,
                    FirstName = userData.LoggedInUser.FirstName ?? throw new ArgumentException("Cannot find first name."),
                    Email = userData.LoggedInUser.Email ?? throw new ArgumentException("Cannot find email address."),
                    HasStravaTokenData = hasStravaTokenData,
                    VerifiedEmail = userData.LoggedInUser.EmailConfirmed,
                    Roles = userData.Roles,
                };

                return new ConfirmEmailRequest.Response
                {
                    Success = result.Success,
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
