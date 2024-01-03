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
        public SendPasswordResetEmailRequest(string userId, string accessToken, string refreshToken)
        {
            UserId = userId;
            AccessToken = accessToken;
            RefreshToken = refreshToken;
        }

        public string UserId { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public class Response
        {
            public bool Success { get; set; }
        }
    }
}