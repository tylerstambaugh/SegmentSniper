namespace StravaApiClient.Services.Activity
{
    public interface IGetSummaryActivityForTimeRange
    {
        Task<GetSummaryActivityForTimeRangeContract.Result> ExecuteAsync(GetSummaryActivityForTimeRangeContract contract);
    }

    public class GetSummaryActivityForTimeRangeContract
    {
       
        public class Result
        {
            public Result()
            {
                
            }
        }
    }
}