using StravaApiClient.Configuration;
using StravaApiClient.Services.Activity;
using StravaApiClient.Services.Segment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StravaApiClient
{
    public class StravaRequestService : IStravaRequestService
    {
        private readonly IStravaRequestClientConfiguration _config;
        private readonly IStravaRequestClient _client;

        public StravaRequestService(IStravaRequestClientConfiguration config)
        {
            _config = config;
            _client = new StravaRequestClient(config);
        }

        public string RefreshToken
        {
            get => _config.RefreshToken;
            set => _config.RefreshToken = value;
        }

        public Task<GetSummaryActivityForTimeRangeContract.Result> GetSummaryActivityForTimeRange(GetSummaryActivityForTimeRangeContract contract)
        {
            var service = new GetSummaryActivityForTimeRange(_client);
            return service.ExecuteAsync(contract);
        }

        public Task<GetDetailedActivityByIdContract.Result> GetDetailedActivityById(GetDetailedActivityByIdContract contract)
        {
            var service = new GetDetailedActivityById(_client);
            return service.ExecuteAsync(contract);
        }

        public Task<GetDetailedSegmentByIdContract.Result> GetDetailedSegmentById(GetDetailedSegmentByIdContract contract)
        {
            var service = new GetDetailedSegmentById(_client);
            return service.ExecuteAsync(contract);
        }
    }
}
