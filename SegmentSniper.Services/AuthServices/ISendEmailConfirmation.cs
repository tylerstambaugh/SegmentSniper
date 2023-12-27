namespace SegmentSniper.Services.AuthServices
{
    public interface ISendEmailConfirmation
    {
        Task Execute(SendEmailConfirmationContract contract);
    }

    public class SendEmailConfirmationContract
    {
        public SendEmailConfirmationContract(string emailAddress)
        {
            EmailAddress = emailAddress;
        }

        public string EmailAddress { get; set; }

        public class Result
        {
        }
    }
}
