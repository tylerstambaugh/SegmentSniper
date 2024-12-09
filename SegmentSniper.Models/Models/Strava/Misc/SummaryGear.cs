using System.Text.Json.Serialization;

namespace SegmentSniper.Models.Models.Strava.Misc
{
    public class SummaryGear
    {
        public string Id { get; set; }

        public bool Primary { get; set; }

        public string Name { get; set; }

        public string Nickname { get; set; }

        public int ResourceState { get; set; }

        public bool Retired { get; set; }

        public long MetersLogged { get; set; }

        public double ConvertedDistance { get; set; }
    }
}
