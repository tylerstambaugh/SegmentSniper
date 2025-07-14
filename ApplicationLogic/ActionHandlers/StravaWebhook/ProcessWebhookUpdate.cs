using SegmentSniper.Services.User;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook
{
    public class ProcessWebhookUpdate : IProcessWebhookUpdate
    {
        private readonly IGetUserByStravaAthleteId _getUserByStravaAthleteId;

        public ProcessWebhookUpdate(IGetUserByStravaAthleteId getUserByStravaAthleteId)
        {
            _getUserByStravaAthleteId = getUserByStravaAthleteId;
        }

        public async Task<bool> HandleAsync(WebhookUpdate webhookUpdate)
        {

            var user = await _getUserByStravaAthleteId.ExecuteAsync(new GetUserByStravaAthleteIdContract(webhookUpdate.OwnerId));
            if (webhookUpdate.ObjectType == "activity" && webhookUpdate.AspectType == "update")
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
