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
            public Response(bool success)
            {
                Success = success;
            }
            public bool Success { get; }
        }
    }
}