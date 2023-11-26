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
            List<SegmentEffortListItemModel> segmentsEffortListItems = new List<SegmentEffortListItemModel>();

            foreach (DetailedSegmentEffort segmentEffort in activity.SegmentEfforts)
            {
                segmentsEffortListItems.Add(_segmentAdapter.AdaptDetailedSegmentEffortToSegmentEffortListModel(segmentEffort));
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
                StartLatlng = activity.StartLatlng,
                EndLatlng = activity.EndLatlng,
                SegmentEffortListItems = segmentsEffortListItems,
                StravaMap = activity.Map
            };
            return returnActivity;
        }

        public DetailedActivityUIModel AdaptDetailedActivityModelToDetailedActivityUIModel(DetailedActivity model)
        {

            List<SegmentEffortListItemModel> segments = new List<SegmentEffortListItemModel>();

            foreach (DetailedSegmentEffort segmentEffort in model.SegmentEfforts)
            {
                segments.Add(_segmentAdapter.AdaptDetailedSegmentEffortToSegmentEffortListModel(segmentEffort));
            }

            DetailedActivityUIModel returnModel = new DetailedActivityUIModel
            {

                ActivityId = model.ActivityId,
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

        public ActivityListModel AdaptSummaryActivitytoActivityList(SummaryActivity activity)
        {
            
            ActivityListModel returnActivity = new ActivityListModel
            {
                ActivityId = activity.Id,
                Name = activity.Name,
                Distance = Math.Round(CommonConversionHelpers.ConvertMetersToMiles(activity.Distance), 2),
                Type = activity.Type,
                StartDate = activity.StartDate.ToShortDateString(),
                ElapsedTimeSeconds = activity.ElapsedTime,
                ElapsedTime = TimeSpan.FromSeconds(activity.ElapsedTime).ToString(@"hh\:mm\:ss"),
                AchievementCount = activity.AchievementCount,
                MaxSpeed = Math.Round(CommonConversionHelpers.ConvertMetersPerSecondToMilesPerHour(activity.MaxSpeed), 2),
                StravaMap = activity.Map
            };
            return returnActivity;
        }
    }
}
