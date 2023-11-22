using SegmentSniper.Models.Models.Strava.Misc;
using SegmentSniper.Models.Models.Strava.Segment;

namespace SegmentSniper.Models.UIModels.Segment
{
    public class SegmentEffortListModel
    {
        public string ActivityId { get; set; }
        public string SegmentEffortId { get; set; }
        public string SegmentId { get; set; }
        public string Name { get; set; }
        public string ElapsedTime { get; set; }
        public string MovingTime { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime StartDateLocal { get; set; }
        public double Distance { get; set; }
        public int StartIndex { get; set; }
        public int EndIndex { get; set; }
        public bool DeviceWatts { get; set; }
        public double AverageWatts { get; set; }
        public double AverageHeartrate { get; set; }
        public double MaxHeartrate { get; set; }
        public SummarySegment SummarySegment { get; set; }
        public List<Achievement> Achievements { get; set; }
        public int? PrRank { get; set; }
        public bool Hidden { get; set; }

    }
}
