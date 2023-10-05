using SegmentSniper.Data;
using StravaApiClient;
using static SegmentSniper.Data.Enums.ActivityTypeEnum;

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

        public async Task<GetSummaryActivityByIdRequest.Response> Handle(GetSummaryActivityByIdRequest request)
        {
            ValidateRequest(request);
            var token = _context.StravaToken.Where(t => t.UserId == request.UserId).FirstOrDefault();
            if (token == null)
            {
                try
                {
                    _stravaRequestService.RefreshToken = token.RefreshToken;
                    ActivityType parsedActivity;

                    return new GetSummaryActivityByIdRequest.Response();

                }
                catch (Exception ex)
                {
                    //do something different here instead of throwing the exception. log it and return null?
                    throw new ApplicationException("Something went wrong handling the request.", ex);
                }
            }
            else
            {
                throw new ApplicationException("Something went wrong 'handling' the request");
            }
        }

        private void ValidateRequest(GetSummaryActivityByIdRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }
            if (request.ActivityId == null)
            {
                throw new ArgumentNullException(nameof(request.ActivityId), "Activity Id cannot be null");
            }
        }
    }
}
