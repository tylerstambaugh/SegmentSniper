using SegmentSniper.Models.Models.Strava.Segment;
using SegmentSniper.Models.UIModels.Segment;
using System;

namespace SegmentSniper.Services.Common.Adapters
{
    public class SegmentAdapter : ISegmentAdapter
    {
        public SegmentEffortListItemModel AdaptDetailedSegmentEffortToSegmentEffortListModel(DetailedSegmentEffort model)
        {
            SegmentEffortListItemModel returnModel = new SegmentEffortListItemModel
            {
                SegmentId = model.SummarySegment.Id,
                SegmentEffortId = model.SegmentEffortId,
                ActivityId = model.ActivityId,
                Name = model.Name,
                Distance = Math.Round(CommonConversionHelpers.ConvertMetersToMiles(model.Distance), 2),
                ElapsedTime = TimeSpan.FromSeconds(model.ElapsedTime).ToString(@"hh\:mm\:ss"),
                MovingTime = TimeSpan.FromSeconds(model.MovingTime).ToString(@"hh\:mm\:ss"),
                StartDate = model.StartDate,
                MaxHeartrate = model.MaxHeartrate,
                AverageWatts = model.AverageWatts,
                Achievements = model.Achievements,
                PrRank = model.PrRank,
                Hidden = model.Hidden,
                SummarySegment = model.SummarySegment,             
            };
            return returnModel;
        }
    }
}
