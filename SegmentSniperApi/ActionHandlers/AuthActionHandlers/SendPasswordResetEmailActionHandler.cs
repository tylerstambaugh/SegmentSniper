using Duende.IdentityServer.Validation;
using Microsoft.AspNetCore.Identity;
using SegmentSniper.Data.Entities.Auth;
using SegmentSniper.Services.AuthServices;
using System.Diagnostics.Contracts;

namespace SegmentSniper.Api.ActionHandlers.AuthActionHandlers
{
    public class SendPasswordResetEmailActionHandler : ISendPasswordResetEmailActionHandler
    {
        private readonly ISendPasswordResetEmail _sendChangePasswordEmail;

        public SendPasswordResetEmailActionHandler(ISendPasswordResetEmail sendChangePasswordEmail)
        {
            _sendChangePasswordEmail = sendChangePasswordEmail;
        }

        public async Task<SendPasswordResetEmailRequest.Response> HandleAsync(SendPasswordResetEmailRequest request)
        {
            ValidatedRequest(request);

            var result = await _sendChangePasswordEmail.Execute(new SendChangePasswordEmailContract(request.UserId, request.AccessToken, request.RefreshToken));

            return new SendPasswordResetEmailRequest.Response { Success = result.Success };
        }

        private void ValidatedRequest(SendPasswordResetEmailRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }
            if (string.IsNullOrWhiteSpace(request.UserId))
            {
                throw new ArgumentException(nameof(request.UserId));
            }
            if (string.IsNullOrWhiteSpace(request.AccessToken))
            {
                throw new ArgumentException(nameof(request.AccessToken));
            }
            if (string.IsNullOrWhiteSpace(request.RefreshToken))
            {
                throw new ArgumentException(nameof(request.RefreshToken));
            }
        }
    }
}
