using StravaApiClient.Models.Misc;

namespace StravaApiClient.Models.Segment
{
    public class XomsApiModel
    {
        public string kom { get; set; }
        public string qom { get; set; }
        public string overall { get; set; }
        public DestinationApiModel destination { get; set; }
    }
}
