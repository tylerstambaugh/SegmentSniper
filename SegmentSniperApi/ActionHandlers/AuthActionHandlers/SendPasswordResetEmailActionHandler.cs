using SegmentSniper.Services.AuthServices;

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

            var result = await _sendChangePasswordEmail.ExecuteAsync(new SendChangePasswordEmailContract(request.EmailAddress));

            return new SendPasswordResetEmailRequest.Response { Success = result.Success };
        }

        private void ValidatedRequest(SendPasswordResetEmailRequest request)
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
