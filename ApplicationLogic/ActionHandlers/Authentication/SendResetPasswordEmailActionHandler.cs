using SegmentSniper.Services.AuthServices;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.Authentication
{
    public class SendResetPasswordEmailActionHandler : ISendResetPasswordEmailActionHandler
    {
        private readonly ISendPasswordResetEmail _sendChangePasswordEmail;

        public SendResetPasswordEmailActionHandler(ISendPasswordResetEmail sendChangePasswordEmail)
        {
            _sendChangePasswordEmail = sendChangePasswordEmail;
        }

        public async Task<SendResetPasswordEmailRequest.Response> HandleAsync(SendResetPasswordEmailRequest request)
        {
            ValidatedRequest(request);

            var result = await _sendChangePasswordEmail.ExecuteAsync(new SendChangePasswordEmailContract(request.EmailAddress));

            return new SendResetPasswordEmailRequest.Response { Success = result.Success };
        }

        private void ValidatedRequest(SendResetPasswordEmailRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }
            if (string.IsNullOrWhiteSpace(request.EmailAddress))
            {
                throw new ArgumentException(nameof(request.EmailAddress));
            }
        }
    }
}
