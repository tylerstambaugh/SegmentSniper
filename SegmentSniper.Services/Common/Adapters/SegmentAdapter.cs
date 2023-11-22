using SegmentSniper.Models.Models.Strava.Segment;
using SegmentSniper.Models.UIModels.Segment;

namespace SegmentSniper.Services.Common.Adapters
{
    public class SegmentAdapter : ISegmentAdapter
    {
        public SegmentEffortListModel AdaptDetailedSegmentEffortToSegmentEffortListModel(DetailedSegmentEffort model)
        {
            SegmentEffortListModel returnModel = new SegmentEffortListModel
            {
                SegmentId = model.SummarySegment.Id,
                SegmentEffortId = model.SegmentEffortId,
                ActivityId = model.ActivityId,
                Name = model.Name,
                Distance = Math.Round(CommonConversionHelpers.ConvertMetersToMiles(model.Distance), 2),
                Time = TimeSpan.FromSeconds(model.ElapsedTime).ToString(@"hh\:mm\:ss"),
                Starred = model.SummarySegment.Starred,
                SummarySegment = model.SummarySegment,
                

                //Rank = model.Achievements.OrderBy(r => r.Rank).First().Rank,
            };
            return returnModel;
        }
    }
}
