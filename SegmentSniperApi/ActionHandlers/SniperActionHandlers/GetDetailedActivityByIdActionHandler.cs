using AutoMapper;
using SegmentSniper.Data;
using SegmentSniper.Models.Models.Garage;
using SegmentSniper.Models.Models.Strava.Activity;
using SegmentSniper.Services.Garage;
using StravaApiClient;
using StravaApiClient.Models.Activity;
using StravaApiClient.Services.Activity;
using SegmentSniper.Services.Common;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    [Obsolete]
    public class GetDetailedActivityByIdActionHandler : IGetDetailedActivityByIdActionHandler
    {
        private readonly ISegmentSniperDbContext _context;
        private readonly IStravaRequestService _stravaRequestService;
        private readonly IUpsertBike _addBikeService;
        private readonly IMapper _mapper;

        public GetDetailedActivityByIdActionHandler(ISegmentSniperDbContext context, IStravaRequestService stravaRequestService, IUpsertBike addBikeService, IMapper mapper)
        {
            _context = context;
            _stravaRequestService = stravaRequestService;
            _addBikeService = addBikeService;
            _mapper = mapper;
        }

        public async Task<GetDetailedActivityByIdRequest.Response> Handle(GetDetailedActivityByIdRequest request)
        {
            ValidateRequest(request);
            var token = _context.StravaTokens.Where(t => t.UserId == request.UserId).FirstOrDefault();
            if (token != null)
            {
                try
                {
                    _stravaRequestService.UserId = request.UserId;
                    _stravaRequestService.RefreshToken = token.RefreshToken;

                    var response = await _stravaRequestService.GetDetailedActivityById(new GetDetailedActivityByIdContract(request.ActivityId));

                    DetailedActivity activity = _mapper.Map<DetailedActivityApiModel, DetailedActivity>(response.DetailedActivity);

                    UpsertBike(activity);                   

                    return new GetDetailedActivityByIdRequest.Response
                    {
                        DetailedActivity = activity,
                    };
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

        private void UpsertBike(DetailedActivity activity)
        {
           var bikeToUpsert = new BikeModel
            {
                BikeId = activity.SummaryGear.Id,
                Name = activity.SummaryGear.Name,
                MetersLogged = activity.SummaryGear.MetersLogged,
            };

            _addBikeService.Execute(new AddBikeContract { Bike = bikeToUpsert });
        }

        private void ValidateRequest(GetDetailedActivityByIdRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            if (string.IsNullOrWhiteSpace(request.ActivityId))
            {
                throw new ArgumentException(nameof(request.ActivityId), "ActivityId cannot be empty");
            }

            if (string.IsNullOrWhiteSpace(request.UserId))
            {
                throw new ArgumentException(nameof(request.UserId), "USerId cannot be empty");
            }
        }
    }
}
