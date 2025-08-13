//using MailKit.Net.Smtp;
//using MailKit.Security;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.Extensions.Configuration;
//using MimeKit;
//using MimeKit.Text;
//using SegmentSniper.Data.Entities.Auth;

//namespace SegmentSniper.Services.AuthServices
//{
//    public class SendPasswordWasResetEmail : ISendPasswordWasResetEmail
//    {
//        private readonly IConfiguration _configuration;

//        private UserManager<ApplicationUser> _userManager { get; }

//        public SendPasswordWasResetEmail(UserManager<ApplicationUser> userManager, IConfiguration configuration)
//        {
//            _userManager = userManager;
//            _configuration = configuration;
//        }

//        public async Task<SendPasswordWasResetEmailContract.Result> ExecuteAsync(SendPasswordWasResetEmailContract contract)
//        {
//            ValidateContract(contract);
//            var user = _userManager.FindByEmailAsync(contract.EmailAddress).Result;
//            var baseUrl = _configuration["AppBaseUrl"];
//            try
//            {
//                string emailBody = @"
//                <!DOCTYPE html>
//                <html lang=""en"">
//                <head>
//                    <meta charset=""UTF-8"">
//                    <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
//                    <title>Email Confirmation</title>
//                </head>
//                <body>
//                    <p>Dear " + user.FirstName + @",</p>
//                    <p>A password reset was recently performed on your account</p>
//                    <p>If you did not recently reset your password, please go to the app and do so now, or contact the Segment Sniper Pro team for assistance.</p>
//                    <p><a href=""" + baseUrl + @""" target=""""_blank"""">Segment Sniper Pro</a></p>

//                    <p>Best regards,<br>The Segment Sniper Pro Team</p>
//                </body>
//                </html>";


//                // create email message
//                var email = new MimeMessage();
//                email.From.Add(MailboxAddress.Parse(_configuration["GmailUserName"]));
//                email.To.Add(MailboxAddress.Parse(user.NormalizedEmail));
//                email.Subject = "Segment Sniper Confirm Email";
//                email.Body = new TextPart(TextFormat.Html) { Text = emailBody };

//                // send email
//                using var smtp = new SmtpClient();
//                smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
//                var smtpUsername = _configuration["GmailUserName"];
//                var smtpPassword = _configuration["GmailPassword"];
//                smtp.Authenticate(smtpUsername, smtpPassword);
//                var result = smtp.Send(email);
//                smtp.Disconnect(true);

//                if (result != null)
//                    return new SendPasswordWasResetEmailContract.Result(true);
//                else
//                    return new SendPasswordWasResetEmailContract.Result(false);
//            }
//            catch (Exception ex)
//            {
//                throw new ApplicationException("Failed to send password was reset email", ex);
//            }
//        }

//        private void ValidateContract(SendPasswordWasResetEmailContract contract)
//        {
//            if (contract == null)
//            {
//                throw new ArgumentNullException(nameof(contract));
//            }
//            if (string.IsNullOrWhiteSpace(contract.EmailAddress))
//            {
//                throw new ArgumentException(nameof(contract.EmailAddress));
//            }
//        }
//    }
//}
