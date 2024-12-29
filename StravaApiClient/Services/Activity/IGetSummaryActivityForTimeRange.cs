using SegmentSniper.Models.Models.Strava.Activity;

namespace StravaApiClient.Services.Activity
{
    public interface IGetSummaryActivityForTimeRange
    {
        Task<GetSummaryActivityForTimeRangeContract.Result> ExecuteAsync(GetSummaryActivityForTimeRangeContract contract);
    }

    public class GetSummaryActivityForTimeRangeContract
    {
        public GetSummaryActivityForTimeRangeContract()
        {
            
        }
        public GetSummaryActivityForTimeRangeContract(int startDate, int endDate, int numResults)
        {
            StartDate = startDate;
            EndDate = endDate;
            NumResults = numResults;
        }

        public int StartDate { get; }

        public int EndDate { get; }
        public int NumResults { get; } = 20;

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