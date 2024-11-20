using Microsoft.Extensions.Caching.Memory;
using SegmentSniper.Services.StravaTokenServices;
using StravaApiClient.Configuration;
using StravaApiClient.Services.Activity;
using StravaApiClient.Services.Segment;

namespace StravaApiClient
{
    public class StravaRequestService : IStravaRequestService
    {
        private readonly IStravaRequestClientConfiguration _config;
        private readonly IStravaRequestClient _client;

        public StravaRequestService(IStravaRequestClientConfiguration config, IMemoryCache cache, IUpdateStravaTokenForUser updateStravaTokenForUser)
        {
            _config = config;
            _client = new StravaRequestClient(config, cache, updateStravaTokenForUser);
        }

        public string RefreshToken
        {
            get => _config.RefreshToken;
            set => _config.RefreshToken = value;
        }

        public string UserId
        {
            get => _config.UserId;
            set => _config.UserId = value;
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

        public Task<StarSegmentContract.Result> StarSegment(StarSegmentContract contract)
        {
            var service = new StarSegment(_client);
            return service.ExecuteAsync(contract);
        }
    }
}
