using SegmentSniper.Models.Strava.Misc;
using SegmentSniper.Models.UIModels.Segment;

namespace SegmentSniper.Models.UIModels.Activity
{
    public class ActivityListModel
    {
        public string ActivityId { get; set; }
        public string Name { get; set; }
        public double Distance { get; set; }
        public string Type { get; set; }
        public string StartDate { get; set; }
        public int ElapsedTimeSeconds { get; set; }
        public string ElapsedTime { get; set; }
        public double? MaxSpeed { get; set; }
        public int AchievementCount { get; set; }
        public MapModel? StravaMap { get; set; }
        public List<double>? StartLatlng { get; set; }
        public List<double>? EndLatlng { get; set; }
        public List<SegmentEffortListItemModel> SegmentEffortListItems { get; set; }
    }
}
