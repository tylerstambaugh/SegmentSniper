
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using MimeKit;
using MimeKit.Text;
using SegmentSniper.Data.Entities.Auth;

namespace SegmentSniper.Services.AuthServices
{
    public class SendEmailConfirmation : ISendEmailConfirmation
    {
        private readonly IConfiguration _configuration;

        private UserManager<ApplicationUser> _userManager { get; }

        public SendEmailConfirmation(UserManager<ApplicationUser> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<SendEmailConfirmationContract.Result> Execute(SendEmailConfirmationContract contract)
        {
            ValidateContract(contract);

            var user = _userManager.FindByIdAsync(contract.UserId).Result;

            if (user == null)
            {
                throw new ApplicationException($"User {contract.UserId} was not found");
            }

            try
            {
                var confirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var baseUrl = _configuration["AppBaseUrl"];
                var confirmationLink = $"{baseUrl}/confirm-email?t={confirmationToken}&at={contract.AccessToken}&rt={contract.RefreshToken}";
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
                    <p>Thank you for registering with Segment Sniper Pro. To complete your registration and confirm your email address, please click the following link:</p>
                    <p><a href=""" + confirmationLink + @""" target=""_blank"">Confirm Email Address</a></p>
                    <p>If you did not register with our service, you can safely ignore this email.</p>
                    <p>Best regards,<br>The Segment Sniper Pro Team</p>
                </body>
                </html>";


                // create email message
                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse(_configuration["GmailUserName"]));
                email.To.Add(MailboxAddress.Parse(user.NormalizedEmail));
                email.Subject = "Segment Sniper Confirm Email";
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
                    return new SendEmailConfirmationContract.Result { Success = true };
                else
                { return new SendEmailConfirmationContract.Result { Success = false }; }
            }
            catch(Exception ex)
            {
                throw new ApplicationException("Failed to send confirmation email", ex);
            }

        }

        private void ValidateContract(SendEmailConfirmationContract contract)
        {
            if (contract == null)
            {
                throw new ArgumentNullException(nameof(contract));
            }
            if (string.IsNullOrWhiteSpace(contract.UserId))
            {
                throw new ArgumentException(nameof(contract.UserId));
            }
        }
    }
}
