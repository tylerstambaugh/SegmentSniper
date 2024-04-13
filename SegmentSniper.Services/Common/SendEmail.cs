using Microsoft.Extensions.Configuration;
using SegmentSniper.Services.AuthServices;

namespace SegmentSniper.Services.Common
{
    public class SendEmail : ISendEmail
    {
        private readonly IConfiguration _configuration;

        public SendEmail()
        {

        }

        public async Task<SendEmailContract.Result> ExecuteAsync(SendEmailContract contract)
        {
            ValidateContract(contract);

            throw new NotImplementedException();

        }

        private void ValidateContract(SendEmailContract contract)
        {
            throw new NotImplementedException();
        }
    }
}
