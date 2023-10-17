using SegmentSniper.Models.Models.Strava.Segment;
using SegmentSniper.Models.UIModels.Segment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegmentSniper.Services.Common.Adapters
{
    public interface ISegmentAdapter
    {
        SegmentEffortListModel AdaptDetailedSegmentEffortToSegmentUIModel(DetailedSegmentEffort model);
    }
}
