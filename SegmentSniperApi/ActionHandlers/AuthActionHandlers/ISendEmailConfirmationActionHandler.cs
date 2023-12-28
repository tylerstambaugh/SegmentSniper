namespace SegmentSniper.Api.ActionHandlers.AuthActionHandlers
{
    public interface ISendEmailConfirmationActionHandler
    {
        Task<SendEmailConfirmationRequest.Response> HandleAsync(SendEmailConfirmationRequest request);
    }

    public class SendEmailConfirmationRequest
    {
        public string? UserId { get; set; }

        public class Response
        {
            public bool Success { get; set; }
        }
    }
}