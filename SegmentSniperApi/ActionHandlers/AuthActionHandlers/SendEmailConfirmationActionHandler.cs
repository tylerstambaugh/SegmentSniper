using SegmentSniper.Services.AuthServices;

namespace SegmentSniper.Api.ActionHandlers.AuthActionHandlers
{
    public class SendEmailConfirmationActionHandler : ISendEmailConfirmationActionHandler
    {
        private readonly ISendEmailConfirmation _sendEmailConfirmation;

        public SendEmailConfirmationActionHandler(ISendEmailConfirmation sendEmailConfirmation)
        {
            _sendEmailConfirmation = sendEmailConfirmation;
        }

        public async Task<SendEmailConfirmationRequest.Response> HandleAsync(SendEmailConfirmationRequest request)
        {

            var result =  await _sendEmailConfirmation.Execute(new SendEmailConfirmationContract
            {
                UserId = request.UserId!,
            });

            return new SendEmailConfirmationRequest.Response { Success = result.Success };
        }
    }
}
