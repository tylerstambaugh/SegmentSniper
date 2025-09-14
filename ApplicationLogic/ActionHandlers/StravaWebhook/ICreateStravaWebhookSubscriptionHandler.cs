
namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook
{
    public interface ICreateStravaWebhookSubscriptionHandler
    {      

        Task<CreateStravaWebhookSubscriptionResponse> ExecuteAsync();
    }
    public class CreateStravaWebhookSubscriptionResponse
    {
        public bool Success { get; set; }
        public string? Error { get; set; }

        public CreateStravaWebhookSubscriptionResponse(bool success, string? error = null)
        {
            Success = success;
            Error = error;
        }
    }
}