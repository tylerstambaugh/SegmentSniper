namespace SegmentSniper.Api.ActionHandlers.AuthActionHandlers
{
    public interface IConfirmEmailActionHandler
    {
        Task<bool> HandleAsync(ConfirmEmailRequest request);
    }

    public class ConfirmEmailRequest
    {
        public string? UserId { get; set; }
        public string ConfirmationToken { get; set; }
        public class ConfirmEmailResponse
        {
            public bool Success { get; set; }
        }
    }
}
