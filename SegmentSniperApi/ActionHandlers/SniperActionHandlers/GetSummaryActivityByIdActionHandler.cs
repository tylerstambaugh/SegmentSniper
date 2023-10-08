using AutoMapper;
using SegmentSniper.Data;
using SegmentSniper.Models.Models.Strava.Activity;
using StravaApiClient;
using StravaApiClient.Models.Activity;
using StravaApiClient.Services.Activity;
using static SegmentSniper.Data.Enums.ActivityTypeEnum;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public class GetSummaryActivityByIdActionHandler : IGetSummaryActivityByIdActionHandler
    {
        private readonly ISegmentSniperDbContext _context;
        private readonly IStravaRequestService _stravaRequestService;
        private readonly IMapper _mapper;

        public GetSummaryActivityByIdActionHandler(ISegmentSniperDbContext context, IStravaRequestService stravaRequestService, IMapper mapper)
        {
            _context = context;
            _stravaRequestService = stravaRequestService;
            _mapper = mapper;
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

                    var response = await _stravaRequestService.GetDetailedActivityById(new GetDetailedActivityByIdContract(request.ActivityId));

                    SummaryActivityModel activity = _mapper.Map<DetailedActivityApiModel, SummaryActivityModel>(response.DetailedActivity);

                   List<SummaryActivityModel> returnList = new List<SummaryActivityModel> { activity };

                    return new GetSummaryActivityByIdRequest.Response { SummaryActivities = returnList };

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
