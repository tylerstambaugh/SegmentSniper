using System.Text.Json.Serialization;

namespace StravaApiClient.Models.Webhook
{
    public class CreateSubscriptionApiResponse
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
    }
}
