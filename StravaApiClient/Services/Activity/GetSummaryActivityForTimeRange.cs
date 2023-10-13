using SegmentSniper.Models.Models.Strava.Activity;

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

            var apiResponse = _stravaRequestClient.GetAsync<List<SummaryActivityModel>>($"athlete/activities?after={contract.StartDate}&before={contract.EndDate}");

            return new GetSummaryActivityForTimeRangeContract.Result(apiResponse.Result);
        }

        public void ValidateContract(GetSummaryActivityForTimeRangeContract contract)
        {
            if (contract == null) throw new ArgumentNullException(nameof(contract));
            //add more validations
        }
    }
}
