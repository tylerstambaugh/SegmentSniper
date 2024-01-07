using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using MimeKit;
using MimeKit.Text;
using SegmentSniper.Data.Entities.Auth;

namespace SegmentSniper.Services.AuthServices
{
    public class SendPasswordResetEmail : ISendPasswordResetEmail
    {


        private readonly IConfiguration _configuration;

        private UserManager<ApplicationUser> _userManager { get; }

        public SendPasswordResetEmail(UserManager<ApplicationUser> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<SendChangePasswordEmailContract.Result> ExecuteAsync(SendChangePasswordEmailContract contract)
        {
            ValidateContract(contract);

            var user = _userManager.FindByEmailAsync(contract.EmailAddress).Result;

            if (user == null)
            {
                throw new ApplicationException($"Email address {contract.EmailAddress} was not found");
            }

            try
            {
                var passwordResetToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var baseUrl = _configuration["AppBaseUrl"];
                var resetPasswordLink = $"{baseUrl}/reset-password?prt={passwordResetToken}&uid={user.Id}";
                string emailBody = @"
                <!DOCTYPE html>
                <html lang=""en"">
                <head>
                    <meta charset=""UTF-8"">
                    <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
                    <title>Email Confirmation</title>
                </head>
                <body>
                    <p>Dear " + user.FirstName + @",</p>
                    <p>We received a request to change the password for your Segment Sniper Pro account. If you initiated this request, please follow the instructions below to complete the password change process.</p>
                    <p>**Click the link below to reset your password:**</p>
                    <p><a href=""" + resetPasswordLink + @""" target=""_blank"">Password Reset Link</a></p>
                    <p>Please note that this link is valid for a limited time. If you did not request a password change or believe this request is in error, please disregard this email.</p>
                    
                   p>For security reasons, we recommend that you do not share this link with others. Segment Sniper Pro will never ask you to share your password or click on links in unsolicited emails.</p>
                   p>BIf you encounter any issues or have further questions, please contact our support team at segmentsniperpro@gmail.com.</p>
                   p>Thank you for using Segment Sniper Pro.</p>
                   p>Best regards,<br>The Segment Sniper Pro Team</p>
                </body>
                </html>";


                // create email message
                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse(_configuration["GmailUserName"]));
                email.To.Add(MailboxAddress.Parse(user.NormalizedEmail));
                email.Subject = "Segment Sniper Password Reset";
                email.Subject = "Segment Sniper Password Reset";
                email.Body = new TextPart(TextFormat.Html) { Text = emailBody };

                // send email
                using var smtp = new SmtpClient();
                smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                var smtpUsername = _configuration["GmailUserName"];
                var smtpPassword = _configuration["GmailPassword"];
                smtp.Authenticate(smtpUsername, smtpPassword);
                var result = smtp.Send(email);
                smtp.Disconnect(true);

                if (result != null)
                    return new SendChangePasswordEmailContract.Result { Success = true };
                else
                { return new SendChangePasswordEmailContract.Result { Success = false }; }
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Failed to send confirmation email", ex);
            }

        }

        private void ValidateContract(SendChangePasswordEmailContract contract)
        {
            if (contract == null)
            {
                throw new ArgumentNullException(nameof(contract));
            }
            if (string.IsNullOrWhiteSpace(contract.EmailAddress))
            {
                throw new ArgumentException(nameof(contract.EmailAddress));
            }
        }
    }
}
