using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegmentSniper.Models.Models.Strava.Misc
{
    public class MapModel
    {
        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("summary_polyline")]
        public string SummaryPolyLine { get; set; }
    }
}
