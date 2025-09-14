using StravaApiClient.Services.Activity;
using StravaApiClient.Services.Gear;
using StravaApiClient.Services.Segment;
using StravaApiClient.Services.Webhook;

namespace StravaApiClient
{
    public interface IStravaRequestService
    {
        Task<GetSummaryActivityForTimeRangeContract.Result> GetSummaryActivityForTimeRange(GetSummaryActivityForTimeRangeContract contract);

        Task<GetDetailedActivityByIdContract.Result> GetDetailedActivityById(GetDetailedActivityByIdContract contract);

        Task<GetDetailedSegmentByIdContract.Result> GetDetailedSegmentById(GetDetailedSegmentByIdContract contract);
        Task<StarSegmentContract.Result> StarSegment(StarSegmentContract contract);
        Task<GetGearByIdContract.Result> GetGearById(GetGearByIdContract contract);

        string RefreshToken { get; set;  }
        string UserId { get; set; }
    }
}