namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook.EventHandlers
{
    public class WebhookEventHandlerResponse
    {        
        public WebhookEventHandlerResponse(bool success, string message = "")
        {
            Success = success;
            Message = message;
        }

        public bool Success { get; }
        public string Message { get; }
    }
}
