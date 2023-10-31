using SegmentSniper.Data.Enums;
using static SegmentSniper.Data.Enums.ActivityTypeEnum;

namespace SegmentSniper.Api.Controllers.Contracts
{
    public class GetActivityListForTimeRangeContract
    {
        public DateTime EndDate { get; set; }
        public DateTime StartDate { get; set; }
        public string ActivityType { get; set; }
    }
}
