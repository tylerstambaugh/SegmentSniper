//using Microsoft.AspNetCore.Identity;
//using SegmentSniper.Data.Entities.Auth;
//using SegmentSniper.Services.Common;
//using SegmentSniper.Services.ManageProfile;

//namespace SegmentSniper.ApplicationLogic.ActionHandlers.ManageProfile
//{
//    public class RequestChangeEmailVerificationCodeAsyncActionHandler : IRequestChangeEmailVerificationCodeAsyncActionHandler
//    {
//        private readonly IGenerateVerificationCodeForEmailAddressChange _generateVerificationCodeForEmailAddressChange;
//        private readonly ISendEmail _sendEmail;
//        private readonly UserManager<ApplicationUser> _userManager;

//        public RequestChangeEmailVerificationCodeAsyncActionHandler(IGenerateVerificationCodeForEmailAddressChange generateVerificationCodeForEmailAddressChange, ISendEmail sendEmail, UserManager<ApplicationUser> userManager)
//        {
//            _generateVerificationCodeForEmailAddressChange = generateVerificationCodeForEmailAddressChange;
//            _sendEmail = sendEmail;
//            _userManager = userManager;
//        }

//        public async Task<RequestChangeEmailVerificationCodeActionHandlerRequest.Response> HandleAsync(RequestChangeEmailVerificationCodeActionHandlerRequest request)
//        {
//            ValidatedRequest(request);

//            var user = _userManager.FindByIdAsync(request.UserId).Result;

//            try
//            {
//                var verificationCode = await _generateVerificationCodeForEmailAddressChange.ExecuteAsync(new GenerateVerificationCodeForEmailAddressChangeContract(request.UserId));

//                if (verificationCode.CodeSaved)
//                {
//                    await SendVerificationCode(user, verificationCode, request.EmailAddress);
//                }

//                return new RequestChangeEmailVerificationCodeActionHandlerRequest.Response
//                {
//                    Success = verificationCode.CodeSaved,
//                };
//            }
//            catch (Exception ex)
//            {
//                throw new ApplicationException("Unable to send verification code", ex);
//            }

//        }

//        private async Task SendVerificationCode(ApplicationUser? user, GenerateVerificationCodeForEmailAddressChangeContract.Result verificationCode, string email)
//        {
//            var emailSubject = "Segment Sniper Email Verification Code";
//            var emailBody = @"
//                        <!DOCTYPE html>
//                        <html lang=""en"">
//                        <head>
//                            <meta charset=""UTF-8"">
//                            <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
//                            <title>Email Verification Code</title>
//                        </head>
//                        <body>
//                            <p>Dear " + user.FirstName + @",</p>
//                            <p>We received a request to change the email address for your Segment Sniper Pro account. If you initiated this request, please use the code below to complete the email change process.</p>
                            
//                            <p>Your email change verification code is <span style=""font-weight: bold; font-size: larger;"">" + verificationCode.Code + @"</span> and will expire in 60 minutes.</p>
//                            <p>For security reasons, we recommend that you do not share this code with others.</p>
//                            <p>If you encounter any issues or have further questions, please contact our support team at segmentsniperpro@gmail.com.</p>
//                            <p>Thank you for using Segment Sniper Pro.</p>
//                            <p>Best regards,<br>The Segment Sniper Pro Team</p>
//                        </body>
//                        </html>";

//            await _sendEmail.ExecuteAsync(new SendEmailContract
//            {
//                EmailSubject = emailSubject,
//                EmailBody = emailBody,
//                EmailAddress = email,
//            });
//        }

//        private void ValidatedRequest(RequestChangeEmailVerificationCodeActionHandlerRequest request)
//        {
//            if (request == null)
//            {
//                throw new ArgumentNullException(nameof(request));
//            }
//            if (string.IsNullOrWhiteSpace(request.UserId))
//            {
//                throw new ArgumentNullException(nameof(request.UserId));
//            }
//            if (string.IsNullOrWhiteSpace(request.EmailAddress))
//            {
//                throw new ArgumentNullException(nameof(request.EmailAddress));
//            }
//        }
//    }
//}
