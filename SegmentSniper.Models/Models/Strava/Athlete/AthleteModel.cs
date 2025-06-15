using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegmentSniper.Models.Models.Strava.Athlete
{
    using System;
    using System.Collections.Generic;
    using Newtonsoft.Json;

    public class StravaAthleteModel
    {
        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("username")]
        public string Username { get; set; }

        [JsonProperty("resource_state")]
        public int ResourceState { get; set; }

        [JsonProperty("firstname")]
        public string Firstname { get; set; }

        [JsonProperty("lastname")]
        public string Lastname { get; set; }

        [JsonProperty("city")]
        public string City { get; set; }

        [JsonProperty("state")]
        public string State { get; set; }

        [JsonProperty("country")]
        public string Country { get; set; }

        [JsonProperty("sex")]
        public string Sex { get; set; }

        [JsonProperty("premium")]
        public bool Premium { get; set; }

        [JsonProperty("created_at")]
        public DateTime CreatedAt { get; set; }

        [JsonProperty("updated_at")]
        public DateTime UpdatedAt { get; set; }

        [JsonProperty("badge_type_id")]
        public int BadgeTypeId { get; set; }

        [JsonProperty("profile_medium")]
        public string ProfileMedium { get; set; }

        [JsonProperty("profile")]
        public string Profile { get; set; }

        [JsonProperty("friend")]
        public object Friend { get; set; }

        [JsonProperty("follower")]
        public object Follower { get; set; }

        [JsonProperty("follower_count")]
        public int FollowerCount { get; set; }

        [JsonProperty("friend_count")]
        public int FriendCount { get; set; }

        [JsonProperty("mutual_friend_count")]
        public int MutualFriendCount { get; set; }

        [JsonProperty("athlete_type")]
        public int AthleteType { get; set; }

        [JsonProperty("date_preference")]
        public string DatePreference { get; set; }

        [JsonProperty("measurement_preference")]
        public string MeasurementPreference { get; set; }

        [JsonProperty("clubs")]
        public List<object> Clubs { get; set; }

        [JsonProperty("ftp")]
        public object Ftp { get; set; }

        [JsonProperty("weight")]
        public float Weight { get; set; }

        [JsonProperty("bikes")]
        public List<Bike> Bikes { get; set; }

        [JsonProperty("shoes")]
        public List<Shoe> Shoes { get; set; }
    }

    public class Bike
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("primary")]
        public bool Primary { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("resource_state")]
        public int ResourceState { get; set; }

        [JsonProperty("distance")]
        public float Distance { get; set; }
    }

    public class Shoe
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("primary")]
        public bool Primary { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("resource_state")]
        public int ResourceState { get; set; }

        [JsonProperty("distance")]
        public float Distance { get; set; }
    }

}
