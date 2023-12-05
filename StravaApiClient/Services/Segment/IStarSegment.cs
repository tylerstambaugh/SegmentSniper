using Microsoft.Identity.Client;
using Newtonsoft.Json;
using StravaApiClient.Models.Segment;

namespace StravaApiClient.Services.Segment
{
    public interface IStarSegment
    {
        Task<StarSegmentContract.Result> ExecuteAsync(StarSegmentContract contract);
    }

    public class StarSegmentContract
    {
        public StarSegmentContract()
        {
        }

        public bool Star {  get; set; }
        public string SegmentId { get; set; }

        public class Result
        {
            public DetailedSegmentApiModel StarredSegment { get; set; }
        }
    }

    public class StarSegmentData
    {
        public StarSegmentData(bool star)
        {
            Starred = star;
        }
        
        [JsonProperty("starred")]
        public bool Starred { get; set; }
    }
}