using SegmentSniper.Models.Models.Strava.Activity;
using SegmentSniper.Models.UIModels.Activity;

namespace SegmentSniper.Services.Common.Adapters
{
    public interface IActivityAdapter
    {
        ActivityListModel AdaptDetailedActivitytoActivityList(DetailedActivity activity);
        // List<ActivityListModel> AdaptSummaryActivityListtoActivityList(List<SummaryActivityModel> activities);
        DetailedActivityUIModel AdaptDetailedActivityModelToDetailedActivityUIModel(DetailedActivity detailedActivityModel);
    }
}
