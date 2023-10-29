using SegmentSniper.Data;
using StravaApiClient;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public class GetSummarySegmentsByActivityIdActionHandler : IGetSummarySegmentsByActivityIdActionHandler
    {
        private readonly ISegmentSniperDbContext _context;
        private readonly IStravaRequestService _stravaRequestService;

        public GetSummarySegmentsByActivityIdActionHandler(ISegmentSniperDbContext context, IStravaRequestService stravaRequestService)
        {
            _context = context;
            _stravaRequestService = stravaRequestService;
        }

        public async Task<GetSummarySegmentsByActivityIdRequest.Response> Handle(GetSummarySegmentsByActivityIdRequest request)
        {
            ValidatedRequest(request);

            var token = _context.StravaToken.Where(t => t.UserId == request.UserId).FirstOrDefault();

            if (token != null)
            {
                try
                {

                }
                catch(Exception ex)
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
        private void ValidatedRequest(GetSummarySegmentsByActivityIdRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }
        }
    }
