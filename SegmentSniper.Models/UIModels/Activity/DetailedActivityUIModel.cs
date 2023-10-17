using SegmentSniper.Models.Models.Strava.Misc;
using SegmentSniper.Models.Models.Strava.Segment;

namespace SegmentSniper.Models.UIModels.Activity
{
    public class DetailedActivityUIModel
    {

        public string ActivityId { get; set; }

        public int DetailedAthleteId { get; set; }
        public string Name { get; set; }
        public double Distance { get; set; }
        public int MovingTime { get; set; }
        public double TotalElevationGain { get; set; }
        public string Type { get; set; }
        public string StartDate { get; set; }
        public DateTime StartDateLocal { get; set; }
        public int AchievementCount { get; set; }
        public MapModel Map { get; set; }
        public double AverageSpeed { get; set; }
        public double MaxSpeed { get; set; }
        public int PrCount { get; set; }
        public string Description { get; set; }
        public List<DetailedSegmentEffort> SegmentEfforts { get; set; }
    }
}
