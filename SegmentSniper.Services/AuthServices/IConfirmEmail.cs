namespace SegmentSniper.Services.AuthServices
{
    public interface IConfirmEmail
    {
         Task<ConfirmEmailContract.Result> ExecuteAsync(ConfirmEmailContract contract);
    }

    public class ConfirmEmailContract
    {
        public ConfirmEmailContract()
        {
            
        }
        public ConfirmEmailContract(string userId, string emailAddress, string confirmationToken)
        {
            UserId = userId;
            EmailAddress = emailAddress;
            ConfirmationToken = confirmationToken;
        }

        public string UserId { get; set; }
        public string EmailAddress { get; set; }
        public string ConfirmationToken { get; set; }

        public class Result
        {
            public Result(bool success)
            {
                Success = success;
            }

            public bool Success { get; }
        }
    }
}