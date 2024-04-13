namespace SegmentSniper.Services.Common
{
    public interface ISendEmail
    {
        Task<SendEmailContract.Result> ExecuteAsync(SendEmailContract contract);
    }

    public class SendEmailContract
    {
        public string EmailAddress { get; set; }
        public string EmailBody { get; set; } = string.Empty;
        public string EmailSubject { get; set; }

        public class Result
        {
            public bool Success { get; set; }
        }
    }
}