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
        private readonly IStravaRequestClientConfiguration _configuration;

        public GetSummaryActivityForTimeRange(IStravaRequestClient stravaRequestClient, IStravaRequestClientConfiguration configuration)
        {
            _stravaRequestClient = stravaRequestClient;
            _configuration = configuration;
        }

        public async Task<GetSummaryActivityForTimeRangeContract.Result> ExecuteAsync(GetSummaryActivityForTimeRangeContract contract)
        {
            throw new NotImplementedException();
        }
    }
}
