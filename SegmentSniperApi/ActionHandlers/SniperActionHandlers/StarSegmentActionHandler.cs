using AutoMapper;
using SegmentSniper.Data;
using SegmentSniper.Models.Models.Strava.Segment;
using StravaApiClient;
using StravaApiClient.Models.Segment;
using StravaApiClient.Services.Segment;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public class StarSegmentActionHandler : IStarSegmentActionHandler
    {
        private readonly ISegmentSniperDbContext _context;
        private readonly IStravaRequestService _stravaRequestService;
        private readonly IMapper _mapper;

        public StarSegmentActionHandler(ISegmentSniperDbContext context, IStravaRequestService stravaRequestService, IMapper mapper)
        {
            _context = context;
            _stravaRequestService = stravaRequestService;
            _mapper = mapper;
        }

        public async Task<StarSegmentRequest.Response> HandleAsync(StarSegmentRequest request)
        {
            ValidateRequest(request);
            var token = _context.StravaToken.Where(t => t.UserId == request.UserId).FirstOrDefault();
            if (token != null)
            {
                try
                {
                    _stravaRequestService.UserId = request.UserId;
                    _stravaRequestService.RefreshToken = token.RefreshToken;

                    var response = await _stravaRequestService.StarSegment(new StarSegmentContract
                    {
                        SegmentId = request.SegmentId,
                        Star = request.Star
                    });

                    DetailedSegment returnSegment = _mapper.Map<DetailedSegmentApiModel, DetailedSegment>(response.DetailedSegment);

                    return new StarSegmentRequest.Response(returnSegment);

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

        private void ValidateRequest(StarSegmentRequest request)
        {
            throw new NotImplementedException();
        }
    }
}
