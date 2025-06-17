
using Newtonsoft.Json;
using System;

namespace StravaApiClient.Models.Athlete
{


    public class StravaAthleteApiModel
    {
        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("username")]
        public string Username { get; set; }

        [JsonProperty("resource_state")]
        public int ResourceState { get; set; }

        [JsonProperty("firstname")]
        public string? Firstname { get; set; }

        [JsonProperty("lastname")]
        public string? Lastname { get; set; }

        [JsonProperty("bio")]
        public string? Bio { get; set; }

        [JsonProperty("city")]
        public string? City { get; set; }

        [JsonProperty("state")]
        public string? State { get; set; }

        [JsonProperty("country")]
        public string? Country { get; set; }

        [JsonProperty("sex")]
        public string? Sex { get; set; }

        [JsonProperty("premium")]
        public bool Premium { get; set; }

        [JsonProperty("summit")]
        public bool Summit { get; set; }

        [JsonProperty("created_at")]
        public DateTime CreatedAt { get; set; }

        [JsonProperty("updated_at")]
        public DateTime UpdatedAt { get; set; }

        [JsonProperty("badge_type_id")]
        public int BadgeTypeId { get; set; }

        [JsonProperty("weight")]
        public double? Weight { get; set; } = null;

        [JsonProperty("profile_medium")]
        public string ProfileMedium { get; set; }

        [JsonProperty("profile")]
        public string Profile { get; set; }
    }


}
