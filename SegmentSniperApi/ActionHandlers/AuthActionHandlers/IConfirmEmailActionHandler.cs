namespace SegmentSniper.Api.ActionHandlers.AuthActionHandlers
{
    public interface IConfirmEmailActionHandler
    {


    }

    public class ConfirmEmailRequest
    {
        public string Email { get; set; }
        public Guid ConfirmationCode { get; set; }
        public class ConfirmEmailResponse
        {
            public bool Success { get; set; }
        }
    }
}
