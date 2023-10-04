using SegmentSniper.Data;
using StravaApiClient;
using StravaApiClient.Services.Activity;
using static SegmentSniper.Data.Enums.ActivityTypeEnum;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public class GetSummaryActivityForTimeRangeActionHandler : IGetSummaryActivityForTimeRangeActionHandler
    {
        private readonly ISegmentSniperDbContext _context;
        private readonly IStravaRequestService _stravaRequestService;

        public GetSummaryActivityForTimeRangeActionHandler(ISegmentSniperDbContext context, IStravaRequestService stravaRequestService)
        {
            _context = context;
            _stravaRequestService = stravaRequestService;
        }

        public async Task<GetSummaryActivityForTimeRangeRequest.Response> Handle(GetSummaryActivityForTimeRangeRequest request)
        {
            var token = _context.StravaToken.Where(t => t.UserId == request.UserId).FirstOrDefault();

            if (token == null)
            {
                try
                {
                _stravaRequestService.RefreshToken = token.RefreshToken;
                ActivityType parsedActivity;
                Enum.TryParse<ActivityType>(request.ActivityType, true, out parsedActivity);
                {
                        if(request.StartDate != null && request.EndDate != null)
                        {
                    var endDate = request.EndDate.AddDays(1);

                    var unixStartDate = ConvertToEpochTime(request.StartDate);
                    var unixEndDate = ConvertToEpochTime(endDate);

                    var response = await _stravaRequestService.GetSummaryActivityForTimeRange(new GetSummaryActivityForTimeRangeContract(unixStartDate, unixEndDate));

                    return new GetSummaryActivityForTimeRangeRequest.Response { SummaryActivities = response.SummaryActivities };
                        }
                }
                }
                catch (Exception ex)
                {
                    //do something different here instead of throwing the exception. log it and return null?
                    throw new ApplicationException("Something went wrong handling the request.", ex);
                }
            }
            else
            {
                throw new ApplicationException("Something went wrong 'handling' the request");
            }
        }

        private int ConvertToEpochTime(DateTime date)
        {
            DateTime unixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            return (int)(date - unixEpoch).TotalSeconds;
        }

    }
}
