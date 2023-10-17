using SegmentSniper.Models.Models.Strava.Activity;
using SegmentSniper.Models.Models.Strava.Segment;
using SegmentSniper.Models.UIModels.Activity;
using SegmentSniper.Models.UIModels.Segment;

namespace SegmentSniper.Services.Common.Adapters
{
    public class ActivityAdapter : IActivityAdapter
    {
        private readonly ISegmentAdapter _segmentAdapter;

        public ActivityAdapter(ISegmentAdapter segmentAdapter)
        {
            _segmentAdapter = segmentAdapter;
        }
        public ActivityListModel AdaptDetailedActivitytoActivityList(DetailedActivity activity)
        {
            List<SegmentEffortListModel> segments = new List<SegmentEffortListModel>();

            foreach (DetailedSegmentEffort segmentEffort in activity.SegmentEfforts)
            {
                segments.Add(_segmentAdapter.AdaptDetailedSegmentEffortToSegmentUIModel(segmentEffort));
            }

            ActivityListModel returnActivity = new ActivityListModel
            {
                ActivityId = activity.ActivityId,
                Name = activity.Name,
                Distance = Math.Round(CommonConversionHelpers.ConvertMetersToMiles(activity.Distance), 2),
                Type = activity.Type,
                StartDate = activity.StartDate.ToShortDateString(),
                ElapsedTimeSeconds = activity.ElapsedTime,
                ElapsedTime = TimeSpan.FromSeconds(activity.ElapsedTime).ToString(@"hh\:mm\:ss"),
                AchievementCount = activity.AchievementCount,
                MaxSpeed = Math.Round(CommonConversionHelpers.ConvertMetersPerSecondToMilesPerHour(activity.MaxSpeed), 2),
                Segments = segments,
                // StravaMap = activity.Map
            };
            return returnActivity;
        }

        public DetailedActivityUIModel AdaptDetailedActivityModelToDetailedActivityUIModel(DetailedActivity model)
        {

            List<SegmentEffortListModel> segments = new List<SegmentEffortListModel>();

            foreach (DetailedSegmentEffort segmentEffort in model.SegmentEfforts)
            {
                segments.Add(_segmentAdapter.AdaptDetailedSegmentEffortToSegmentUIModel(segmentEffort));
            }

            DetailedActivityUIModel returnModel = new DetailedActivityUIModel
            {

                ActivityId = model.ActivityId,
                DetailedAthleteId = model.DetailedAthleteId,
                Name = model.Name,
                Distance = CommonConversionHelpers.ConvertMetersToMiles(model.Distance),
                MovingTime = model.MovingTime,
                TotalElevationGain = model.TotalElevationGain,
                Type = model.Type,
                StartDate = model.StartDate.ToShortDateString(),
                AchievementCount = model.AchievementCount,
                Map = model.Map,
                AverageSpeed = CommonConversionHelpers.ConvertMetersPerSecondToMilesPerHour(model.AverageSpeed),
                MaxSpeed = Math.Round(CommonConversionHelpers.ConvertMetersPerSecondToMilesPerHour(model.MaxSpeed), 2),
                PrCount = model.PrCount,
                Description = model.Description,
                SegmentEfforts = model.SegmentEfforts
            };

            return returnModel;
        }
    }
}
