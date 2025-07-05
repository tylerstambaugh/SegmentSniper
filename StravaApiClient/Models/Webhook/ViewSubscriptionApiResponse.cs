using System.Text.Json.Serialization;

namespace StravaApiClient.Models.Webhook
{
    public class ViewSubscriptionApiResponse
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("callback_url")]
        public string CallbackUrl { get; set; }

        [JsonPropertyName("created_at")]
        public DateTime CreatedAt { get; set; }
        [JsonPropertyName("updated_at")]
        public DateTime UpdatedAt { get; set; }
        [JsonPropertyName("resource_state")]
        public int ResourceState { get; set; }
        [JsonPropertyName("application_id")]
        public int ApplicationId { get; set; }
    }

    //[{"id":290937,"resource_state":2,"application_id":93654,"callback_url":"https://locust-brave-certainly.ngrok-free.app/api/Webhook","created_at":"2025-07-03T01:56:39+00:00","updated_at":"2025-07-03T01:56:39+00:00"}]
}
