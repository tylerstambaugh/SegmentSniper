using SegmentSniper.Models.Models.Strava.Misc;
using SegmentSniper.Models.UIModels.Segment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        public string? GearId { get; set; }
        public MapModel? StravaMap { get; set; }
        public List<SegmentEffortListModel> Segments { get; set; }
    }
}
