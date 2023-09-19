using StravaApiClient.Configuration;
using StravaApiClient.Services.Activity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StravaApiClient
{
    public  class StravaRequestService
    {
        private readonly IStravaRequestClientConfiguration _config;
        private readonly string _refreshToken;
        private readonly IStravaRequestClient _client;

        public StravaRequestService(IStravaRequestClientConfiguration config, string refreshToken)
        {
            _config = config;
            _config.RefreshToken = refreshToken;
            _client = new StravaRequestClient(config);

        }

        public Task<GetSummaryActivityForTimeRangeContract.Result> GetSummaryActivityForTimeRange(GetSummaryActivityForTimeRangeContract contract)
        {
            var service = new GetSummaryActivityForTimeRange(_client, _config);

            return service.ExecuteAsync(contract);
        }
    }
}
