
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using MimeKit;
using MimeKit.Text;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities.Auth;
using static Duende.IdentityServer.Models.IdentityResources;
using static System.Net.WebRequestMethods;

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

        public async Task Execute(SendEmailConfirmationContract contract)
        {
            ValidateContract(contract);

            var user = _userManager.FindByEmailAsync(contract.EmailAddress).Result;

            if (user == null)
            {
                throw new ApplicationException($"User {contract.EmailAddress} was not found");
            }

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var baseUrl = _configuration["ApiBaseUrl"];
            var confirmationLink = $"https//{baseUrl}/auth/confirmEmail/{token}";

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
                    <p><a href=""" + confirmationLink + @""">Confirm Email Address</a></p>
                    <p>If you did not register with our service, you can safely ignore this email.</p>
                    <p>Best regards,<br>The Segment Sniper Pro Team</p>
                </body>
                </html>";

            // create email message
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_configuration["GmailUserName"]));
            email.To.Add(MailboxAddress.Parse(contract.EmailAddress));
            email.Subject = "Segment Sniper Confirm Email";
            email.Body = new TextPart(TextFormat.Html) { Text = "<h1>Example HTML Message Body</h1>" };

            // send email
            using var smtp = new SmtpClient();
            smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
            smtp.Authenticate(_configuration["GmailUserName"], _configuration["GmailPassword"]);
            smtp.Send(email);
            smtp.Disconnect(true);
        }

        private void ValidateContract(SendEmailConfirmationContract contract)
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
