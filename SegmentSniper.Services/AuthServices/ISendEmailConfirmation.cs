namespace SegmentSniper.Services.AuthServices
{
    public interface ISendEmailConfirmation
    {
        Task<SendEmailConfirmationContract.Result> Execute(SendEmailConfirmationContract contract);
    }

    public class SendEmailConfirmationContract
    {
        public SendEmailConfirmationContract()
        {
            
        }
        public SendEmailConfirmationContract(string userId, string accessToken, string refreshToken)
        {
            UserId = userId;
            AccessToken = accessToken;
            RefreshToken = refreshToken;
        }

        public string UserId { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set;  }

        public class Result
        {
            public bool Success { get; set; }
        }
    }
}
