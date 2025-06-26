using Microsoft.Identity.Client;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook
{
    public class ProcessWebhookUpdate 
    {
        public ProcessWebhookUpdate()
        {

            
            
        }

        public async Task<bool> HandleAsync(WebhookUpdate webhookUpdate)
        {
            if (webhookUpdate.ObjectType == "activity")
            {

                //handle activity updates
            }


            throw new NotImplementedException("Processing webhook updates is not implemented yet.");

        }
    }

    public class WebhookUpdate
    {
        public string ObjectType { get; set; } // "activity" or "athlete"
        public long ObjectId { get; set; } // Activity or athlete ID
        public string AspectType { get; set; } // "create", "update", or "delete"
        public Dictionary<string, string> Updates { get; set; } // Contains keys like "title", "type", "private"
        public long OwnerId { get; set; } // Athlete ID
        public long SubscriptionId { get; set; } // Subscription ID
    }
}
