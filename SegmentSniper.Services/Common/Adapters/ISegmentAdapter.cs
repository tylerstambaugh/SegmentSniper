using SegmentSniper.Models.Models.Strava.Segment;
using SegmentSniper.Models.UIModels.Segment;

namespace SegmentSniper.Services.Common.Adapters
{
    public interface ISegmentAdapter
    {
        SegmentEffortListModel AdaptDetailedSegmentEffortToSegmentEffortListModel(DetailedSegmentEffort model);
    }
}
