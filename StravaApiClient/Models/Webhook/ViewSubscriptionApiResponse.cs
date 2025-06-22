using System.Text.Json.Serialization;

namespace StravaApiClient.Models.Webhook
{
    public class ViewSubscriptionApiResponse
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
    }
}
