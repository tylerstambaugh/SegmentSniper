using Microsoft.AspNetCore.Components.RenderTree;
using Microsoft.Identity.Client;
using Newtonsoft.Json;
using SegmentSniper.Models.Models.Garage;
using System.Text.Json.Serialization;

namespace StravaApiClient.Models.Misc
{
    public class GearApiModel
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
        public long Distance { get; set; }
    }

    public class SummaryGearApiModel
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("primary")]
        public bool Primary { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("nickname")]
        public string Nickname { get; set; }

        [JsonPropertyName("resource_state")]
        public int ResourceState { get; set; }

        [JsonPropertyName("retired")]
        public bool Retired { get; set; }

        [JsonPropertyName("distance")]
        public long Distance { get; set; }

        [JsonPropertyName("converted_distance")]
        public double ConvertedDistance { get; set; }
    }


    public class DetailedGearApiModel
    {
        public string Id { get; set; }
        public bool Primary { get; set; }
        public long Distance { get; set; }
        public string BrandName { get; set; }
        public string ModelName { get; set; }
        public FrameType FrameType { get; set; }
        public string Description { get; set; }

    }
}


//From getActivity:
//"gear": {
//    "id": "b11809995",
//        "primary": false,
//        "name": "BobeSpeed 1",
//        "nickname": "BobeSpeed 1",
//        "resource_state": 2,
//        "retired": false,
//        "distance": 18705588,
//        "converted_distance": 11623.1
//    },

//{
//    "id" : "b1231",
//  "primary" : false,
//  "resource_state" : 3,
//  "distance" : 388206,
//  "brand_name" : "BMC",
//  "model_name" : "Teammachine",
//  "frame_type" : 3,
//  "description" : "My Bike."
//}