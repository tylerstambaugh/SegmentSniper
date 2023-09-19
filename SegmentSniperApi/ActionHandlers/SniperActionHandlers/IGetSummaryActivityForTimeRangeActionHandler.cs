using static SegmentSniper.Data.Enums.ActivityTypeEnum;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public interface IGetSummaryActivityForTimeRangeActionHandler
    {
        GetSummaryActivityForTimeRangeRequest.Response Handle(GetSummaryActivityForTimeRangeRequest request);
    }

    public class GetSummaryActivityForTimeRangeRequest
    {
        public GetSummaryActivityForTimeRangeRequest(DateTime startDate, DateTime endDate, ActivityType activityType)
        {
            StartDate = startDate;
            EndDate = endDate;
            ActivityType = activityType;
        }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public ActivityType? ActivityType { get; }

        public class Response
        {
            public Response()
            {
                
            }
        }
    }
}