using SegmentSniper.Services.User;
using System.Text.Json.Serialization;

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
        [JsonPropertyName("object_type")]
        public string ObjectType { get; set; }

        [JsonPropertyName("object_id")]
        public long ObjectId { get; set; }

        [JsonPropertyName("aspect_type")]
        public string AspectType { get; set; }

        [JsonPropertyName("updates")]
        public Dictionary<string, string> Updates { get; set; }

        [JsonPropertyName("owner_id")]
        public long OwnerId { get; set; }

        [JsonPropertyName("subscription_id")]
        public long SubscriptionId { get; set; }

        [JsonPropertyName("event_time")]
        public long EventTime { get; set; }
    }
}
