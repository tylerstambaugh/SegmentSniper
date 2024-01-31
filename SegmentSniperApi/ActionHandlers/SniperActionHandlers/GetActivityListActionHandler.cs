using AutoMapper;
using SegmentSniper.Data;
using SegmentSniper.Models.Models.Strava.Activity;
using SegmentSniper.Models.UIModels.Activity;
using SegmentSniper.Services.Common.Adapters;
using static SegmentSniper.Data.Enums.ActivityTypeEnum;
using StravaApiClient.Models.Activity;
using StravaApiClient.Services.Activity;
using StravaApiClient;
using IdentityModel;
using SegmentSniper.Data.Enums;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public class GetActivityListActionHandler : IGetActivityListActionHandler
    {
        private readonly ISegmentSniperDbContext _context;
        private readonly IStravaRequestService _stravaRequestService;
        private readonly IMapper _mapper;
        private readonly IActivityAdapter _activityAdapter;

        public GetActivityListActionHandler(ISegmentSniperDbContext context, IStravaRequestService stravaRequestService, IMapper mapper, IActivityAdapter activityAdapter)
        {
            _context = context;
            _stravaRequestService = stravaRequestService;
            _mapper = mapper;
            _activityAdapter = activityAdapter;
        }

        public async Task<GetActivityListRequest.Response> HandleAsync(GetActivityListRequest request)
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

                    var daysAndPages = GetDaysAndPages(new DaysAndPagesContract(request.StartDate.Value, request.EndDate.Value));

                    List<SummaryActivity> listOfSummaryActivities = new List<SummaryActivity>();

                    for(int i = 1; i <= daysAndPages.NumberOfPages; i++ )
                    {
                        var response = await _stravaRequestService.GetSummaryActivityForTimeRange(new GetSummaryActivityForTimeRangeContract(daysAndPages.StartDateUnix, daysAndPages.EndDateUnix, i));

                        listOfSummaryActivities = response.SummaryActivities;

                        if (parsedActivity != ActivityTypeEnum.ActivityType.All)
                        {
                            listOfSummaryActivities = listOfSummaryActivities
                            .Where(sa => sa.Type == request.ActivityType.ToString()).ToList();
                        }

                        if (request.ActivityName != null)
                        {
                            listOfSummaryActivities = listOfSummaryActivities.Where(n => n.Name.ToLower().Contains(request.ActivityName.ToLower())).ToList();                 
                        }
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

                    return new GetActivityListRequest.Response { ActivityList = activityList };

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

        private DaysAndPagesContract.Result GetDaysAndPages(DaysAndPagesContract contract)
        {
            int numPages = 1;
            if(contract.StartDate != null && contract.EndDate != null) 
            {
                TimeSpan? days = contract.EndDate.Value.Subtract(contract.StartDate.Value);
                if(days != null)
                {
                    numPages = (int)days.Value.TotalDays / 30;
                }
            }

            long startDateUnix = contract.StartDate?.ToEpochTime() ??  DateTime.UtcNow.AddDays(-30).ToEpochTime();
            long endDateUnix = contract.EndDate?.ToEpochTime() ??  DateTime.UtcNow.AddDays(1).ToEpochTime();

            return new DaysAndPagesContract.Result
            {
                NumberOfPages = numPages,
                StartDateUnix = (int)startDateUnix,
                EndDateUnix = (int)endDateUnix,
            };
        }

        private void ValidateRequest(GetActivityListRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }
            if(string.IsNullOrWhiteSpace(request.UserId))
            {
                throw new ArgumentNullException("User Id cannot be null");
            }
            if ((request.EndDate == null && request.StartDate == null) || string.IsNullOrWhiteSpace(request.ActivityName))
            {
                throw new ArgumentNullException("Must supply start and end date, or activity name");
            }
        }
    }
}
