using StravaApiClient;
using StravaApiClient.Services.Activity;
using static SegmentSniper.Data.Enums.ActivityTypeEnum;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public class GetSummaryActivityForTimeRangeActionHandler : IGetSummaryActivityForTimeRangeActionHandler
    {
        private readonly IStravaRequestService _stravaRequestService;

        public GetSummaryActivityForTimeRangeActionHandler(IStravaRequestService stravaRequestService)
        {
            _stravaRequestService = stravaRequestService;
        }

        public async Task<GetSummaryActivityForTimeRangeRequest.Response> Handle(GetSummaryActivityForTimeRangeRequest request)
        {

            ActivityType parsedActivity;
            if (Enum.TryParse<ActivityType>(request.ActivityType, true, out parsedActivity))
            {
                var endDate = request.EndDate.AddDays(1);

                var unixStartDate = ConvertToEpochTime(request.StartDate);
                var unixEndDate = ConvertToEpochTime(endDate);

                var summaryActivitiesReturnList = await _stravaRequestService.GetSummaryActivityForTimeRange(new GetSummaryActivityForTimeRangeContract(unixStartDate, unixEndDate));
                return new GetSummaryActivityForTimeRangeRequest.Response { SummaryActivities = summaryActivitiesReturnList.SummaryActivities };
            }
            else
            {
                throw new ArgumentException("Activity type could not be found", nameof(request.ActivityType));
            }

        }

        private int ConvertToEpochTime(DateTime date)
        {
            DateTime unixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            return (int)(date - unixEpoch).TotalSeconds;
        }

    }
}
