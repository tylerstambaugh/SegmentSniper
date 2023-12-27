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

        public Task<bool> Handle(ConfirmEmailRequest request)
        {
            ValidatedRequest(request);

            var result = _confirmEmail.Execute(new ConfirmEmailContract
            {
                Email = request.Email,
                ConfirmationCode = request.ConfirmationCode,
                UserId = request.UserId,
            
            });
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

            if (request.ConfirmationCode == Guid.Empty)
            {
                throw new ArgumentException(nameof(request.ConfirmationCode));
            }

            if (string.IsNullOrWhiteSpace(request.UserId))
            {
                throw new ArgumentException(nameof(request.UserId));
            }
        }
    }
}
