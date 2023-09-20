using StravaApiClient.Services.Activity;

namespace StravaApiClient
{
    public interface IStravaRequestService
    {
        Task<GetSummaryActivityForTimeRangeContract.Result> GetSummaryActivityForTimeRange(GetSummaryActivityForTimeRangeContract contract);
    }
}