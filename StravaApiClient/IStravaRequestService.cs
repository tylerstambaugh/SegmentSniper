using StravaApiClient.Services.Activity;
using StravaApiClient.Services.Segment;

namespace StravaApiClient
{
    public interface IStravaRequestService
    {
        Task<GetSummaryActivityForTimeRangeContract.Result> GetSummaryActivityForTimeRange(GetSummaryActivityForTimeRangeContract contract);

        Task<GetDetailedActivityByIdContract.Result> GetDetailedActivityById(GetDetailedActivityByIdContract contract);

        Task<GetDetailedSegmentByIdContract.Result> GetDetailedSegmentById(GetDetailedSegmentByIdContract contract);
        Task<StarSegmentContract.Result> StarSegment(StarSegmentContract contract);

        string RefreshToken { get; set;  }
        string UserId { get; set; }
    }
}