using Duende.IdentityServer.Validation;
using Microsoft.Identity.Client;
using SegmentSniper.Services.AuthServices;

namespace SegmentSniper.Api.ActionHandlers.AuthActionHandlers
{
    public class ConfirmEmailActionHandler : IConfirmEmailActionHandler
    {
        private readonly IConfirmEmail _confirmEmail;

        public ConfirmEmailActionHandler(IConfirmEmail confirmEmail)
        {
            _confirmEmail = confirmEmail;
        }

        public async Task<bool> HandleAsync(ConfirmEmailRequest request)
        {
            ValidatedRequest(request);

            var result = await _confirmEmail.Execute(new ConfirmEmailContract
            {
                UserId = request.UserId,
                EmailAddress = request.Email,
                ConfirmationToken = request.ConfirmationToken,            
            });

            return result;
        }

        private void ValidatedRequest(ConfirmEmailRequest request)
        {
            if(request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            if(string.IsNullOrWhiteSpace(request.Email))
            {
                throw new ArgumentException(nameof(request.Email));
            }

            if (string.IsNullOrWhiteSpace(request.ConfirmationToken))
            {
                throw new ArgumentException(nameof(request.ConfirmationToken));
            }

            if (string.IsNullOrWhiteSpace(request.UserId))
            {
                throw new ArgumentException(nameof(request.UserId));
            }
        }
    }
}
