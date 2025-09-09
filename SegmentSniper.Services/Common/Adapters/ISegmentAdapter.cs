using SegmentSniper.Models.Strava.Segment;
using SegmentSniper.Models.UIModels.Segment;

namespace SegmentSniper.Services.Common.Adapters
{
    public interface ISegmentAdapter
    {
        SegmentEffortListItemModel AdaptDetailedSegmentEffortToSegmentEffortListModel(DetailedSegmentEffort model);
    }
}
