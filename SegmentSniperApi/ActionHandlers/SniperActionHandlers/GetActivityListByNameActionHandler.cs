using AutoMapper;
using IdentityModel;
using SegmentSniper.Data;
using SegmentSniper.Data.Enums;
using SegmentSniper.Models.Models.Strava.Activity;
using SegmentSniper.Models.UIModels.Activity;
using SegmentSniper.Services.Common;
using SegmentSniper.Services.Common.Adapters;
using StravaApiClient;
using StravaApiClient.Models.Activity;
using StravaApiClient.Services.Activity;
using static SegmentSniper.Data.Enums.ActivityTypeEnum;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public class GetActivityListByNameActionHandler : IGetActivityListByNameActionHandler
    {
        private readonly ISegmentSniperDbContext _context;
        private readonly IStravaRequestService _stravaRequestService;
        private readonly IActivityAdapter _activityAdapter;
        private readonly IMapper _mapper;

        public GetActivityListByNameActionHandler(ISegmentSniperDbContext context, IStravaRequestService stravaRequestService, IActivityAdapter activityAdapter, IMapper mapper)
        {
            _context = context;
            _stravaRequestService = stravaRequestService;
            _activityAdapter = activityAdapter;
            _mapper = mapper;
        }

        public async Task<GetActivityListByNameRequest.Response> HandleAsync(GetActivityListByNameRequest request)
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
                    Enum.TryParse<ActivityType>(request.ActivityType, true, out parsedActivity);

                    var startDate = (int)DateTime.Now.AddYears(-1).ToEpochTime();
                    var endDate = (int)DateTime.UtcNow.ToEpochTime();                                      

                    List<SummaryActivity> nameMatchedActivities = new List<SummaryActivity>();

                    for (int i = 1; i < 6; i++)
                    {
                        var response = await _stravaRequestService.GetSummaryActivityForTimeRange(new GetSummaryActivityForTimeRangeContract(startDate, endDate, i));

                        List<SummaryActivity> listOfSummaryActivities = response.SummaryActivities;

                        if (parsedActivity != ActivityTypeEnum.ActivityType.All)
                        {
                            listOfSummaryActivities = listOfSummaryActivities
                            .Where(sa => sa.Type == request.ActivityType.ToString()).ToList();
                        }

                        List<SummaryActivity> matchedActivities = listOfSummaryActivities.Where(n => n.Name.ToLower().Contains(request.ActivityName.ToLower())).ToList();
                        foreach (SummaryActivity sa in matchedActivities)
                        {
                            if(!nameMatchedActivities.Contains(sa))
                            {
                            nameMatchedActivities.Add(sa);
                            }
                        }
                    }

                    List<DetailedActivity> listOfDetailedActivities = new List<DetailedActivity>();

                    foreach (SummaryActivity activity in nameMatchedActivities)
                    {
                        var detailedActivityResult = _stravaRequestService.GetDetailedActivityById(new GetDetailedActivityByIdContract(activity.Id)).Result;
                        var detailedActivity = _mapper.Map<DetailedActivityApiModel, DetailedActivity>(detailedActivityResult.DetailedActivity);
                        listOfDetailedActivities.Add(detailedActivity);
                    }

                    List<ActivityListModel> activityList = new List<ActivityListModel>();

                    foreach (var activity in listOfDetailedActivities)
                    {
                        activityList.Add(_activityAdapter.AdaptDetailedActivitytoActivityList(activity));
                    }

                    return new GetActivityListByNameRequest.Response { ActivityList = activityList };
                }
                catch (Exception ex)
                {
                    throw new ApplicationException("Something went wrong handling the request.", ex);
                }
            }
            else
            {
                throw new ApplicationException("Missing Strava access token");
            }
        }



        private void ValidateRequest(GetActivityListByNameRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }
            if (string.IsNullOrWhiteSpace(request.ActivityName))
            {
                throw new ArgumentNullException(nameof(request.ActivityName), "Name must be provided");
            }
            if (string.IsNullOrWhiteSpace(request.UserId))
            {
                throw new ArgumentNullException(nameof(request.UserId), "UserId must be provided");
            }
        }
    }
}
