using MailKit.Security;
using Microsoft.Extensions.Configuration;
using MimeKit.Text;
using MimeKit;
using MailKit.Net.Smtp;


namespace SegmentSniper.Services.Common
{
    public class SendEmail : ISendEmail
    {
        private readonly IConfiguration _configuration;

        public SendEmail(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<SendEmailContract.Result> ExecuteAsync(SendEmailContract contract)
        {
            ValidateContract(contract);

            try
            {             
                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse(_configuration["GmailUserName"]));
                email.To.Add(MailboxAddress.Parse(contract.EmailAddress));
                email.Subject = "Segment Sniper Password Reset";
                email.Subject = "Segment Sniper Password Reset";
                email.Body = new TextPart(TextFormat.Html) { Text = contract.EmailBody };

                using var smtp = new SmtpClient();
                smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                var smtpUsername = _configuration["GmailUserName"];
                var smtpPassword = _configuration["GmailPassword"];
                smtp.Authenticate(smtpUsername, smtpPassword);
                var result = smtp.Send(email);
                smtp.Disconnect(true);

                if (result != null)
                    return new SendEmailContract.Result { Success = true };
                else
                { return new SendEmailContract.Result { Success = false }; }
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Failed to send confirmation email", ex);

            }
        }
        
        private void ValidateContract(SendEmailContract contract)
        {
            if (contract == null)
            {
                throw new ArgumentNullException(nameof(contract));
            }

            if (string.IsNullOrWhiteSpace(contract.EmailAddress))
            {
                throw new ArgumentNullException(nameof(contract.EmailAddress));
            }

            if (string.IsNullOrWhiteSpace(contract.EmailSubject))
            {
                throw new ArgumentNullException(nameof(contract.EmailSubject));
            }

            if (string.IsNullOrWhiteSpace(contract.EmailBody))
            {
                throw new ArgumentNullException(nameof(contract.EmailBody));
            }

        }
    }
}
