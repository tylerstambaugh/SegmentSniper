using System.Text.Json.Serialization;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook.Factory
{
    public class WebhookEvent
    {
        [JsonPropertyName("object_type")]
        public required string ObjectType { get; set; }

        [JsonPropertyName("object_id")]
        public long ObjectId { get; set; }

        [JsonPropertyName("aspect_type")]
        public required string AspectType { get; set; }

        [JsonPropertyName("updates")]
        public Dictionary<string, string>? Updates { get; set; }

        [JsonPropertyName("owner_id")]
        public long OwnerId { get; set; }

        [JsonPropertyName("subscription_id")]
        public long SubscriptionId { get; set; }

        [JsonPropertyName("event_time")]
        public long EventTime { get; set; }
    }
}
