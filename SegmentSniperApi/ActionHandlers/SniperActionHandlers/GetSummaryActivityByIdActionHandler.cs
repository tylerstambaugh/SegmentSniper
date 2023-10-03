using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data;
using StravaApiClient;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public class GetSummaryActivityByIdActionHandler : IGetSummaryActivityByIdActionHandler
    {
        private readonly ISegmentSniperDbContext _context;
        private readonly IStravaRequestService _stravaRequestService;

        public GetSummaryActivityByIdActionHandler(ISegmentSniperDbContext context, IStravaRequestService stravaRequestService)
        {
            _context = context;
            _stravaRequestService = stravaRequestService;
        }

        public async Task<GetSummaryActivityById.Response> Handle(GetSummaryActivityById request)
        {
        }
    }
}
