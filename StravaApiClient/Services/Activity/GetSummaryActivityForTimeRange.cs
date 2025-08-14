using SegmentSniper.Models.Strava.Activity;

namespace StravaApiClient.Services.Activity
{
    public class GetSummaryActivityForTimeRange : IGetSummaryActivityForTimeRange
    {
        private readonly IStravaRequestClient _stravaRequestClient;

        public GetSummaryActivityForTimeRange(IStravaRequestClient stravaRequestClient)
        {
            _stravaRequestClient = stravaRequestClient;
        }

        public async Task<GetSummaryActivityForTimeRangeContract.Result> ExecuteAsync(GetSummaryActivityForTimeRangeContract contract)
        {
            ValidateContract(contract);

            var apiResponse = await _stravaRequestClient.GetAsync<List<SummaryActivity>>($"athlete/activities?after={contract.StartDate}&before={contract.EndDate}&per_page={contract.NumResults}");

            return new GetSummaryActivityForTimeRangeContract.Result(apiResponse);
        }

        public void ValidateContract(GetSummaryActivityForTimeRangeContract contract)
        {
            if (contract == null) throw new ArgumentNullException(nameof(contract));
            //add more validations
        }
    }
}
