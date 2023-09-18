using Microsoft.Identity.Client;
using StravaApiClient;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public class GetSummaryActivityForTimeRangeActionHandler : IGetSummaryActivityForTimeRangeActionHandler
    {
        private readonly IStravaRequestClient _stravaRequestClient;

        public GetSummaryActivityForTimeRangeActionHandler(IStravaRequestClient stravaRequestClient)
        {
            _stravaRequestClient = stravaRequestClient;
        }

        public async GetSummaryActivityForTimeRangeRequest.Response Handle(GetSummaryActivityForTimeRangeRequest request)
        {
            throw new NotImplementedException();
        }
    }
}
