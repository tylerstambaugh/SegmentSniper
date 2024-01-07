namespace SegmentSniper.Services.AuthServices
{
    public interface ISendPasswordWasResetEmail
    {
        Task<SendPasswordWasResetEmailContract.Result> ExecuteAsync(SendPasswordWasResetEmailContract contract);
    }

    public class SendPasswordWasResetEmailContract
    {
        public SendPasswordWasResetEmailContract(string emailAddress)
        {
            EmailAddress = emailAddress;
        }

        public string EmailAddress { get; }
        public class Result
        {
            public Result(bool success)
            {
                Success = success;
            }

            public bool Success { get; set; }
        }
    }
}