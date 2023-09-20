using SegmentSniper.Models.Models.Strava.Activity;
using StravaApiClient.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

            var apiResponse = _stravaRequestClient.PostAsync<List<SummaryActivityModel>>($"athlete/activities/after={contract.StartDate}&before={contract.EndDate}");

           return new GetSummaryActivityForTimeRangeContract.Result(apiResponse.Result);
        }

        public void ValidateContract(GetSummaryActivityForTimeRangeContract contract)
        {
            if(contract == null) throw new ArgumentNullException(nameof(contract));
            //add more validations
        }
    }
}
