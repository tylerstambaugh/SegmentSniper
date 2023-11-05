using AutoMapper;
using SegmentSniper.Data;
using SegmentSniper.Models.Models.Strava.Activity;
using SegmentSniper.Models.UIModels.Activity;
using SegmentSniper.Services.Common.Adapters;
using StravaApiClient;
using StravaApiClient.Models.Activity;
using StravaApiClient.Services.Activity;
using static SegmentSniper.Data.Enums.ActivityTypeEnum;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public class GetActivityListByIdActionHandler : IGetActivityListByIdActionHandler
    {
        private readonly ISegmentSniperDbContext _context;
        private readonly IStravaRequestService _stravaRequestService;
        private readonly IMapper _mapper;
        private readonly IActivityAdapter _activityAdapter;

        public GetActivityListByIdActionHandler(ISegmentSniperDbContext context, IStravaRequestService stravaRequestService, IMapper mapper, IActivityAdapter activityAdapter)
        {
            _context = context;
            _stravaRequestService = stravaRequestService;
            _mapper = mapper;
            _activityAdapter = activityAdapter;
        }

        public async Task<GetActivityListByIdRequest.Response> HandleAsync(GetActivityListByIdRequest request)
        {
            ValidateRequest(request);
            var token = _context.StravaToken.Where(t => t.UserId == request.UserId).FirstOrDefault();
            if (token != null)
            {
                try
                {
                    _stravaRequestService.UserId = request.UserId;
                    _stravaRequestService.RefreshToken = token.RefreshToken;
                    ActivityType parsedActivity;

                    var response = await _stravaRequestService.GetDetailedActivityById(new GetDetailedActivityByIdContract(request.ActivityId));

                    DetailedActivity activity = _mapper.Map<DetailedActivityApiModel, DetailedActivity>(response.DetailedActivity);

                    var returnActivity = _activityAdapter.AdaptDetailedActivitytoActivityList(activity);

                   List<ActivityListModel> returnList = new List<ActivityListModel> { returnActivity };

                    return new GetActivityListByIdRequest.Response { ActivityList = returnList };

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

        private void ValidateRequest(GetActivityListByIdRequest request)
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
