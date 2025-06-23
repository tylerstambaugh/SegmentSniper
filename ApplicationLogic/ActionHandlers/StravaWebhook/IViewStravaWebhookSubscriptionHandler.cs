using SegmentSniper.Models.Models.Strava.Webhook;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook
{
    public interface IViewStravaWebhookSubscriptionHandler
    {
        Task<ViewStravaWebhookSubscriptionRequest.Response> HandleAsync();
    }

    public class ViewStravaWebhookSubscriptionRequest
    {
        public class Response
        {
            public ViewSubscriptionResponseModel ViewSubscriptionResponseModel { get; set; }
            public Response(ViewSubscriptionResponseModel viewSubscriptionApiResponseModel)
            {
                ViewSubscriptionResponseModel = viewSubscriptionApiResponseModel;
            }
        }
    }
}