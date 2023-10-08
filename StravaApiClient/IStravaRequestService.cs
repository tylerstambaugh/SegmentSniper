using StravaApiClient.Services.Activity;

namespace StravaApiClient
{
    public interface IStravaRequestService
    {
        Task<GetSummaryActivityForTimeRangeContract.Result> GetSummaryActivityForTimeRange(GetSummaryActivityForTimeRangeContract contract);

        Task<GetDetailedActivityByIdContract.Result> GetDetailedActivityById(GetDetailedActivityByIdContract contract);

        string RefreshToken { get; set;  }
    }
}