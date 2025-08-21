using AutoMapper;
using SegmentSniper.Data;
using SegmentSniper.Models.Garage;
using SegmentSniper.Models.Strava.Activity;
using SegmentSniper.Services.Garage;
using StravaApiClient;
using StravaApiClient.Models.Activity;
using StravaApiClient.Services.Activity;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.Sniper
{
    public class GetDetailedActivityByIdActionHandler : IGetDetailedActivityByIdActionHandler
    {
        private readonly ISegmentSniperDbContext _context;
        private readonly IStravaRequestService _stravaRequestService;
        private readonly IUpsertBike _upsertBikeService;
        private readonly IMapper _mapper;

        public GetDetailedActivityByIdActionHandler(ISegmentSniperDbContext context, IStravaRequestService stravaRequestService, IUpsertBike addBikeService, IMapper mapper)
        {
            _context = context;
            _stravaRequestService = stravaRequestService;
            _upsertBikeService = addBikeService;
            _mapper = mapper;
        }

        public async Task<GetDetailedActivityByIdRequest.Response> HandleAsync(GetDetailedActivityByIdRequest request)
        {
            ValidateRequest(request);
            var token = _context.Users.Where(t => t.AuthUserId == request.UserId.ToString()).FirstOrDefault();
            if (token?.StravaRefreshToken != null)
            {
                try
                {
                    _stravaRequestService.UserId = request.UserId.ToString();
                    _stravaRequestService.RefreshToken = token.StravaRefreshToken;

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
                ImportedFromStrava = true,
            };

            _upsertBikeService.ExecuteAsync(new UpsertBikeContract(bikeToUpsert));
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

            if (string.IsNullOrEmpty(request.UserId))
            {
                throw new ArgumentException(nameof(request.UserId), "UserId cannot be empty");
            }
        }
    }
}
