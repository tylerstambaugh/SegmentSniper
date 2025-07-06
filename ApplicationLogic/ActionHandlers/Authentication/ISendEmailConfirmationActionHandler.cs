namespace SegmentSniper.ApplicationLogic.ActionHandlers.Authentication
{
    public interface ISendEmailConfirmationActionHandler
    {
        Task<SendEmailConfirmationRequest.Response> HandleAsync(SendEmailConfirmationRequest request);
    }

    public class SendEmailConfirmationRequest
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public string? UserId { get; set; }

        public class Response
        {
            public bool Success { get; set; }
        }
    }
}