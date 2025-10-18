using System;
using AutoMapper;
using SegmentSniper.Data;
using SegmentSniper.Data.Enums;
using SegmentSniper.Models.Garage;
using SegmentSniper.Models.Strava.Activity;
using SegmentSniper.Models.UIModels.Activity;
using SegmentSniper.Services.Common.Adapters;
using SegmentSniper.Services.Garage;
using Serilog;
using StravaApiClient;
using StravaApiClient.Models.Activity;
using StravaApiClient.Models.Misc;
using StravaApiClient.Services.Activity;
using StravaApiClient.Services.Gear;
using static SegmentSniper.Data.Enums.ActivityTypeEnum;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.Sniper
{
    public class GetActivityListActionHandler : IGetActivityListActionHandler
    {
        private readonly ISegmentSniperDbContext _context;
        private readonly IStravaRequestService _stravaRequestService;
        private readonly IMapper _mapper;
        private readonly IActivityAdapter _activityAdapter;
        private readonly IGetAllBikesByUserId _getAllBikesByUserId;
        private readonly IGetAllBikeActivitiesByUserId _getAllBikeActivitiesByUserId;
        private readonly IAddBikeActivity _addBikeActivity;
        private readonly IUpsertBike _upsertBike;
        private readonly int maxActivityResults = 200;

        public GetActivityListActionHandler(
            ISegmentSniperDbContext context,
            IStravaRequestService stravaRequestService,
            IMapper mapper, IActivityAdapter activityAdapter,
            IGetAllBikesByUserId getAllBikesByUserId,
            IGetAllBikeActivitiesByUserId getAllBikeActivitiesByUserId,
            IAddBikeActivity addBikeActivity,
            IUpsertBike upsertBike)
        {
            _context = context;
            _stravaRequestService = stravaRequestService;
            _mapper = mapper;
            _activityAdapter = activityAdapter;
            _getAllBikesByUserId = getAllBikesByUserId;
            _getAllBikeActivitiesByUserId = getAllBikeActivitiesByUserId;
            _addBikeActivity = addBikeActivity;
            _upsertBike = upsertBike;
        }

        public async Task<GetActivityListRequest.Response> HandleAsync(GetActivityListRequest request)
        {
            ValidateRequest(request);
            var token = _context.Users.Where(t => t.AuthUserId == request.UserId).FirstOrDefault();
            if (token != null)
            {
                try
                {
                    _stravaRequestService.UserId = request.UserId;
                    _stravaRequestService.RefreshToken = token.StravaRefreshToken;

                    ActivityType parsedActivity;
                    Enum.TryParse<ActivityType>(request.ActivityType, true, out parsedActivity);

                    var daysRange = GetDaysRange(new DaysAndPagesContract(request.StartDate, request.EndDate));

                    List<SummaryActivity> listOfSummaryActivities = new List<SummaryActivity>();

                    var response = await _stravaRequestService.GetSummaryActivityForTimeRange(new GetSummaryActivityForTimeRangeContract(daysRange.StartDateUnix, daysRange.EndDateUnix, maxActivityResults));

                    listOfSummaryActivities = response.SummaryActivities;

                    await UpdateGarage(listOfSummaryActivities, request.UserId);

                    if (parsedActivity != ActivityTypeEnum.ActivityType.All)
                    {
                        listOfSummaryActivities = listOfSummaryActivities
                        .Where(sa => sa.Type == request.ActivityType.ToString()).ToList();
                    }

                    if (request.ActivityName != null)
                    {
                        listOfSummaryActivities = listOfSummaryActivities.Where(n => n.Name.ToLower().Contains(request.ActivityName.ToLower())).ToList();
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

                    //Log.Debug($"Activity Search");


                    return new GetActivityListRequest.Response { ActivityList = activityList };

                }
                catch (Exception ex)
                {
                    //do something different here instead of throwing the exception. log it and return null?
                    Log.Error($"GetActivityDetails error: {ex.Message}");
                    throw new ApplicationException($"GetActivityListError \n Details: {ex.Message}");
                }
            }
            else
            {
                throw new ApplicationException("Invalid or missing Strava Authorization");
            }
        }

        private async Task UpdateGarage(List<SummaryActivity> listOfSummaryActivities, string userId)
        {
            //for each summary activity
            //check to see if bike exists, add it if it doesn't
            //create bikeActivity record for each activityId that doesn't already have bikeActivity record

            var existingBikes = await _getAllBikesByUserId.ExecuteAsync(contract: new GetAllBikesByUserIdContract(userId));
            var userBikeActivities = await _getAllBikeActivitiesByUserId.ExecuteAsync(contract: new GetAllBikeActivitiesByUserIdContract(userId));
            foreach (var summaryActivity in listOfSummaryActivities.Where(sa => sa.GearId != null && sa.Type == ActivityType.Ride.ToString()))
            {
                if (existingBikes.Bikes.Any(b => b.BikeId == summaryActivity.GearId))
                {
                    //need to check if the bikeActivity exists and create it if not
                    var bikeActivity = userBikeActivities.BikeActivities.Any(ba => ba.StravaActivityId == summaryActivity.Id);
                    if (!bikeActivity)
                    {
                        await _addBikeActivity.ExecuteAsync(new AddBikeActivityContract(
                            new BikeActivityModel
                            {
                                StravaActivityId = summaryActivity.Id,
                                UserId = userId,
                                BikeId = summaryActivity.GearId,
                                ActivityDate = summaryActivity.StartDate,
                                DistanceInMeters = summaryActivity.Distance,

                            })
                        );
                    }

                    //TODO Add the mileage to any equipment on the bike
                }
                else
                {
                    //need to get the bikeDetails,
                    var bikeApiModelResult = await _stravaRequestService.GetGearById(new GetGearByIdContract(summaryActivity.GearId));
                    var bikeApiModel = bikeApiModelResult.DetailedGearApiModel;
                    //adapt the bike
                    var bikeToAdd = _mapper.Map<DetailedGearApiModel, BikeModel>(bikeApiModel);
                    bikeToAdd.UserId = userId;
                    bikeToAdd.ImportedFromStrava = true;
                    //persist the bike
                    var bikeAdded = await _upsertBike.ExecuteAsync(new UpsertBikeContract(bikeToAdd));

                    if (bikeAdded.Bike == null)
                    {
                        Log.Error("Failed to add GearId: {GearId} from GetActivityListHandler.", bikeApiModel.Id);
                    }

                    //and add the bikeActivity
                    var bikeActivity = userBikeActivities.BikeActivities.Any(ba => ba.StravaActivityId == summaryActivity.Id);

                    var bikeActivityAdded = await _addBikeActivity.ExecuteAsync(new AddBikeActivityContract(
                        new BikeActivityModel
                        {
                            StravaActivityId = summaryActivity.Id,
                            UserId = userId,
                            BikeId = bikeAdded.Bike.BikeId,
                            ActivityDate = summaryActivity.StartDate,
                            DistanceInMeters = summaryActivity.Distance,

                        })
                    );
                    if (!bikeActivityAdded.Success)
                    {
                        Log.Error("Failed to add bikeActivity {ActivityId} from GetActivityListHandler.", summaryActivity.Id);
                    }
                }
            }
        }

        private DaysAndPagesContract.Result GetDaysRange(DaysAndPagesContract contract)
        {
            long startDateUnix = contract.StartDate != null
                ? new DateTimeOffset(contract.StartDate.Value.AddHours(-5).ToUniversalTime()).ToUnixTimeSeconds()
                : new DateTimeOffset(DateTime.UtcNow.AddDays(-180)).ToUnixTimeSeconds();

            long endDateUnix = contract.EndDate != null
                ? new DateTimeOffset(contract.EndDate.Value.AddDays(1).ToUniversalTime()).ToUnixTimeSeconds()
                : new DateTimeOffset(DateTime.UtcNow.AddDays(1)).ToUnixTimeSeconds();


            return new DaysAndPagesContract.Result
            {
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
            if (string.IsNullOrWhiteSpace(request.UserId))
            {
                throw new ArgumentNullException("User Id cannot be null");
            }
            if ((request.EndDate == null && request.StartDate == null) && string.IsNullOrWhiteSpace(request.ActivityName))
            {
                throw new ArgumentNullException("Must supply start and end date, or activity name");
            }
        }
    }
}
