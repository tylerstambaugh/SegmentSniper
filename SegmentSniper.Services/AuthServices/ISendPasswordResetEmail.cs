namespace SegmentSniper.Services.AuthServices
{
    public interface ISendPasswordResetEmail
    {
        Task<SendChangePasswordEmailContract.Result> ExecuteAsync(SendChangePasswordEmailContract contract);
    }

    public class SendChangePasswordEmailContract
    {
        public SendChangePasswordEmailContract(string emailAddress)
        {
            EmailAddress = emailAddress;
        }
        public string EmailAddress { get; }

        public class Result
        {
            public bool Success { get; set; }
        }
    }
}