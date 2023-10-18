using AutoMapper;
using SegmentSniper.Data;
using SegmentSniper.Models.Models.Strava.Activity;
using StravaApiClient;
using StravaApiClient.Models.Activity;
using StravaApiClient.Services.Activity;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public class GetDetailedActivityByIdActionHandler : IGetDetailedActivityByIdActionHandler
    {
        private readonly ISegmentSniperDbContext _context;
        private readonly IStravaRequestService _stravaRequestService;
        private readonly IMapper _mapper;

        public GetDetailedActivityByIdActionHandler(ISegmentSniperDbContext context, IStravaRequestService stravaRequestService, IMapper mapper)
        {
            _context = context;
            _stravaRequestService = stravaRequestService;
            _mapper = mapper;
        }

        public async Task<GetDetailedActivityByIdRequest.Response> Handle(GetDetailedActivityByIdRequest request)
        {
            ValidateRequest(request);
            var token = _context.StravaToken.Where(t => t.UserId == request.UserId).FirstOrDefault();
            if (token != null)
            {
                try
                {
                    _stravaRequestService.RefreshToken = token.RefreshToken;

                    var response = await _stravaRequestService.GetDetailedActivityById(new GetDetailedActivityByIdContract(request.ActivityId));

                    DetailedActivity activity = _mapper.Map<DetailedActivityApiModel, DetailedActivity>(response.DetailedActivity);

                    List<DetailedActivity> returnList = new List<DetailedActivity> { activity };

                    return new GetDetailedActivityByIdRequest.Response();
                }
                catch (Exception ex)
                {
                    //do something different here instead of throwing the exception. log it and return null?
                    throw new ApplicationException("Something went wrong handling the request.", ex);
                }
            }
            else
            {
                throw new ApplicationException("Something went wrong 'handling the request");
            }
        }

        private void ValidateRequest(GetDetailedActivityByIdRequest request)
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
