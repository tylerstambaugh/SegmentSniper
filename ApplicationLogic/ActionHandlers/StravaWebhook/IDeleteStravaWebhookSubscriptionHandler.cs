namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook
{
    public interface IDeleteStravaWebhookSubscriptionHandler
    {
        Task<DeleteStravaWebhookSubscriptionRequest.Response> HandleAsync();
    }

    public class DeleteStravaWebhookSubscriptionRequest
    {
        public class Response
        {
            public Response(bool success, string? message = null)
            {
                Success = success;
                Message = message;
            }
            public bool Success { get; }
            public string? Message { get; set; } = string.Empty;
        }
    }
}