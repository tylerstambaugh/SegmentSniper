using AutoMapper;
using SegmentSniper.Data;
using SegmentSniper.Data.Enums;
using SegmentSniper.Models.Models.Strava.Activity;
using SegmentSniper.Models.UIModels.Activity;
using SegmentSniper.Services.Common.Adapters;
using StravaApiClient;
using StravaApiClient.Models.Activity;
using StravaApiClient.Services.Activity;
using static SegmentSniper.Data.Enums.ActivityTypeEnum;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public class GetActivityListForTimeRangeActionHandler : IGetActivityListForTimeRangeActionHandler
    {
        private readonly ISegmentSniperDbContext _context;
        private readonly IStravaRequestService _stravaRequestService;
        private readonly IActivityAdapter _activityAdapter;
        private readonly IMapper _mapper;

        public GetActivityListForTimeRangeActionHandler(ISegmentSniperDbContext context, IStravaRequestService stravaRequestService, IActivityAdapter activityAdapter, IMapper mapper)
        {
            _context = context;
            _stravaRequestService = stravaRequestService;
            _activityAdapter = activityAdapter;
            _mapper = mapper;
        }

        public async Task<GetActivityListForTimeRangeRequest.Response> Handle(GetActivityListForTimeRangeRequest request)
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

                    var endDate = request.EndDate.AddDays(1);

                    var unixStartDate = ConvertToEpochTime(request.StartDate);
                    var unixEndDate = ConvertToEpochTime(endDate);
                    int page = 1;

                    var response = await _stravaRequestService.GetSummaryActivityForTimeRange(new GetSummaryActivityForTimeRangeContract(unixStartDate, unixEndDate, page));

                    List<SummaryActivity> listOfSummaryActivities = response.SummaryActivities;

                    if (parsedActivity != ActivityTypeEnum.ActivityType.All)
                    {
                        listOfSummaryActivities = listOfSummaryActivities
                        .Where(sa => sa.Type == request.ActivityType.ToString()).ToList();
                    }

                    List<DetailedActivity> listOfDetailedActivities = new List<DetailedActivity>();

                    foreach (SummaryActivity activity in listOfSummaryActivities)
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

                    return new GetActivityListForTimeRangeRequest.Response { ActivityList = activityList };
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

        private int ConvertToEpochTime(DateTime date)
        {
            DateTime unixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            return (int)(date - unixEpoch).TotalSeconds;
        }

        private void ValidateRequest(GetActivityListForTimeRangeRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }
            if (request.StartDate == null)
            {
                throw new ArgumentNullException(nameof(request.StartDate), "Start date cannot be null");
            }
            if (request.EndDate == null)
            {
                throw new ArgumentNullException(nameof(request.EndDate), "End date cannot be null");
            }
        }
    }
}
