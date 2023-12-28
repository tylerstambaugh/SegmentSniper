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
        public SendEmailConfirmationContract(string userId)
        {
            UserId = userId;
        }

        public string UserId { get; set; }

        public class Result
        {
            public bool Success { get; set; }
        }
    }
}
