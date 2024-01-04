namespace SegmentSniper.Api.ActionHandlers.AuthActionHandlers
{
    public interface ISendPasswordResetEmailActionHandler
    {
        Task<SendPasswordResetEmailRequest.Response> HandleAsync(SendPasswordResetEmailRequest request);
    }

    public class SendPasswordResetEmailRequest
    {

        public SendPasswordResetEmailRequest()
        {

        }
        public SendPasswordResetEmailRequest(string emailAddress)
        {
            EmailAddress = emailAddress;
        }

        public string EmailAddress { get; }

        public class Response
        {
            public bool Success { get; set; }
        }
    }
}