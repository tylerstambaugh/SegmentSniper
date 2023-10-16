using SegmentSniper.Models.Models.Strava.Activity;

namespace StravaApiClient.Services.Activity
{
    public interface IGetSummaryActivityForTimeRange
    {
        Task<GetSummaryActivityForTimeRangeContract.Result> ExecuteAsync(GetSummaryActivityForTimeRangeContract contract);
    }

    public class GetSummaryActivityForTimeRangeContract
    {
        public GetSummaryActivityForTimeRangeContract(int startDate, int endDate)
        {
            StartDate = startDate;
            EndDate = endDate;
        }

        public int StartDate { get; }

        public int EndDate { get; }

        public class Result
        {
            public Result(List<SummaryActivity> summaryActivities)
            {
                SummaryActivities = summaryActivities;
            }
            public List<SummaryActivity> SummaryActivities { get; set; }
        }
    }
}