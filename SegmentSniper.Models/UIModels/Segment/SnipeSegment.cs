using SegmentSniper.Models.Models.Strava.Misc;
using SegmentSniper.Models.Models.Strava.Segment;

namespace SegmentSniper.Models.UIModels.Segment
{
    public class SnipeSegment
    {
        public string ActivityId { get; set; }
        public DetailedSegmentEffort DetailedSegmentEffort { get; set; }
        public string SegmentId { get; set; }
        public string Name { get; set; }
        public string KomTime { get; set; }
        public string QomTime { get; set; }
        public double PercentageFromKom{ get; set; }
        public double PercentageFromQom{ get; set; }
        public string SecondsFromKom { get; set; }
        public string SecondsFromQom { get; set; }
        public string ActivityType { get; set; }
        public double Distance { get; set; }
        public DateTime CreatedAt { get; set; }
        public MapModel Map { get; set; }
        public int EffortCount { get; set; }
        public int AthleteCount { get; set; }
        public bool Starred { get; set; }
        public int StarCount { get; set; }
        public AthleteSegmentStatsUiModel AthleteSegmentStats { get; set; }
        public Xoms Xoms { get; set; }
        public LocalLegend LocalLegend { get; set; }
    }

}
