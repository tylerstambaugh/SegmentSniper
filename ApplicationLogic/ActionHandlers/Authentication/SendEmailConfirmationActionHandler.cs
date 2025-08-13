//using SegmentSniper.Services.AuthServices;

//namespace SegmentSniper.ApplicationLogic.ActionHandlers.Authentication
//{
//    public class SendEmailConfirmationActionHandler : ISendEmailConfirmationActionHandler
//    {
//        private readonly ISendEmailConfirmation _sendEmailConfirmation;

//        public SendEmailConfirmationActionHandler(ISendEmailConfirmation sendEmailConfirmation)
//        {
//            _sendEmailConfirmation = sendEmailConfirmation;
//        }

//        public async Task<SendEmailConfirmationRequest.Response> HandleAsync(SendEmailConfirmationRequest request)
//        {

//            var result = await _sendEmailConfirmation.ExecuteAsync(new SendEmailConfirmationContract(request.UserId, request.AccessToken, request.RefreshToken));

//            return new SendEmailConfirmationRequest.Response { Success = result.Success };
//        }
//    }
//}
