using Newtonsoft.Json;
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
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("primary")]
        public bool Primary { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("nickname")]
        public string Nickname { get; set; }

        [JsonProperty("resource_state")]
        public int ResourceState { get; set; }

        [JsonProperty("retired")]
        public bool Retired { get; set; }

        [JsonProperty("distance")]
        public long Distance { get; set; }

        [JsonProperty("converted_distance")]
        public double ConvertedDistance { get; set; }

        [JsonProperty("brand_name")]
        public string BrandName { get; set; }

        [JsonProperty("model_name")]
        public string ModelName { get; set; }

        [JsonProperty("frame_type")]
        public int FrameType { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("weight")]
        public double Weight { get; set; }
    }


    //"id": "b11809995",
    //"primary": false,
    //"name": "BobeSpeed 1",
    //"nickname": "BobeSpeed 1",
    //"resource_state": 3,
    //"retired": false,
    //"distance": 18842206,
    //"converted_distance": 11708.0,
    //"brand_name": "Litespeed",
    //"model_name": "Ultimate",
    //"frame_type": 3,
    //"description": "",
    //"weight": 20.0

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