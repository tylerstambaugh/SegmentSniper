using AutoMapper;
using SegmentSniper.ApplicationLogic.ActionHandlers.Sniper;
using SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook.Factory;
using SegmentSniper.Data.Entities.Segments;
using SegmentSniper.Models.Garage;
using SegmentSniper.Models.Strava.Segment;
using SegmentSniper.Models.UIModels.Segment;
using SegmentSniper.Services.Common;
using SegmentSniper.Services.Garage;
using SegmentSniper.Services.MachineLearning;
using SegmentSniper.Services.User;
using Serilog;
using StravaApiClient;
using StravaApiClient.Models.Segment;
using StravaApiClient.Services.Gear;
using StravaApiClient.Services.Segment;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook.EventHandlers
{
    public class CreateWebhookEventHandler : IWebhookEventHandler
    {
        private readonly IGetUserByStravaAthleteId _getUserByStravaAthleteId;
        private readonly IGetDetailedActivityByIdActionHandler _getDetailedActivityByIdActionHandler;
        private readonly IAddBikeActivity _addBikeActivity;
        private readonly IGetAllBikesByUserId _getAllBikesByUserId;
        private readonly IUpsertBike _upsertBike;
        private readonly IStravaRequestService _stravaRequestService;
        private readonly ISaveSegmentPredictionTrainingData _saveSegmentPredictionTrainingData;
        private readonly IBikeActivityQueuePublisher _bikeActivityQueuePublisher;
        private readonly IMapper _mapper;
        private string _userId;

        public CreateWebhookEventHandler(IGetUserByStravaAthleteId getUserByStravaAthleteId,
                                         IGetDetailedActivityByIdActionHandler getDetailedActivityByIdActionHandler,
                                         IAddBikeActivity addBikeActivity,
                                         IGetAllBikesByUserId getAllBikesByUserId,
                                         IUpsertBike upsertBike,
                                         IStravaRequestService stravaRequestService,
                                         ISaveSegmentPredictionTrainingData saveSegmentPredictionTrainingData,
                                         IBikeActivityQueuePublisher bikeActivityQueuePublisher,
                                         IMapper mapper)
        {
            _getUserByStravaAthleteId = getUserByStravaAthleteId;
            _getDetailedActivityByIdActionHandler = getDetailedActivityByIdActionHandler;
            _addBikeActivity = addBikeActivity;
            _getAllBikesByUserId = getAllBikesByUserId;
            _upsertBike = upsertBike;
            _stravaRequestService = stravaRequestService;
            _saveSegmentPredictionTrainingData = saveSegmentPredictionTrainingData;
            _bikeActivityQueuePublisher = bikeActivityQueuePublisher;
            _mapper = mapper;
        }
        public async Task<WebhookEventHandlerResponse> HandleEventAsync(WebhookEvent payload)
        {

            try
            {
                var user = await _getUserByStravaAthleteId.ExecuteAsync(new GetUserByStravaAthleteIdContract(payload.OwnerId));

                if (user == null)
                {
                    Log.Error("User not found for Strava athlete ID: {AthleteId}", payload.OwnerId);
                    return new WebhookEventHandlerResponse(false);
                }

                _userId = user.UserId;

                var activityDetails = await _getDetailedActivityByIdActionHandler.HandleAsync(new GetDetailedActivityByIdRequest(user.UserId.ToString(), payload.ObjectId.ToString()));

                if (activityDetails == null || activityDetails.DetailedActivity == null)
                {
                    Log.Error("CreateWebhookHandler: Activity details not found for activity ID: {ActivityId}", payload.ObjectId);
                    return new WebhookEventHandlerResponse(false);
                }

                //look to see if the bike exists, add it if it doesn't, before adding the bikeActivity
                var existingBikes = await _getAllBikesByUserId.ExecuteAsync(new GetAllBikesByUserIdContract(_userId));

                var bikeExists = existingBikes.Bikes.Any(b => b.BikeId == activityDetails.DetailedActivity.GearId);

                if(!bikeExists)
                {
                    var bikeToAdd = _stravaRequestService.GetGearById(new GetGearByIdContract(activityDetails.DetailedActivity.GearId));

                    var bikeAddResult = await _upsertBike.ExecuteAsync(new UpsertBikeContract
                    {
                        Bike = new BikeModel
                        {
                            BikeId = bikeToAdd.Result.DetailedGearApiModel.Id,
                            Name = bikeToAdd.Result.DetailedGearApiModel.Name,
                            UserId = _userId,                            
                            ImportedFromStrava = true,
                            BrandName = bikeToAdd.Result.DetailedGearApiModel.BrandName,
                            ModelName = bikeToAdd.Result.DetailedGearApiModel.ModelName,
                            FrameType = (FrameType?)bikeToAdd.Result.DetailedGearApiModel.FrameType,
                            MetersLogged = bikeToAdd.Result.DetailedGearApiModel.Distance,
                            Description = bikeToAdd.Result.DetailedGearApiModel.Description,
                        }
                    });
                }
                await _addBikeActivity.ExecuteAsync(new AddBikeActivityContract(
                   new BikeActivityModel
                   {
                       StravaActivityId = activityDetails.DetailedActivity.ActivityId,
                       UserId = _userId,
                       BikeId = activityDetails.DetailedActivity.GearId,
                       ActivityDate = activityDetails.DetailedActivity.StartDate,
                       DistanceInMeters = activityDetails.DetailedActivity.Distance,
                       
                   }));

                //should update the total miles on the equipment on the bike too.
                await _bikeActivityQueuePublisher.PublishMessageAsync(new BikeActivityQueueMessage
                {
                    AuthUserId = _userId,
                    BikeId = activityDetails.DetailedActivity.GearId
                });


                List<SnipeSegment> snipeSegments = new List<SnipeSegment>();
                List<ML_SegmentEffort> MlSegmentEfforts = new List<ML_SegmentEffort>();

                foreach (DetailedSegmentEffort dse in activityDetails.DetailedActivity.SegmentEfforts)
                {
                    var detailedSegmentResponse = await _stravaRequestService.GetDetailedSegmentById(new GetDetailedSegmentByIdContract(dse.SummarySegment.Id));
                    DetailedSegment detailedSegment = _mapper.Map<DetailedSegmentApiModel, DetailedSegment>(detailedSegmentResponse.DetailedSegmentApiModel);


                    MlSegmentEfforts.Add(CreateMlSegmentEffort(dse, detailedSegment));
                }

                await _saveSegmentPredictionTrainingData.ExecuteAsync(new SaveSegmentPredictionTrainingDataContract(MlSegmentEfforts));            
           

                return new WebhookEventHandlerResponse(true);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error in CreateWebhookEventHandler.");
                return new WebhookEventHandlerResponse(false);
            }
        }

        //refactor this into the service that saves the ML_SegmentEffort. Use automapper.
        private ML_SegmentEffort CreateMlSegmentEffort(DetailedSegmentEffort dse, DetailedSegment detailedSegment)
        {
            try
            {
                return new ML_SegmentEffort
                {
                    AuthUserId = _userId,
                    ActivityId = dse.ActivityId,
                    StravaSegmentEffortId = dse.SegmentEffortId,
                    StravaSegmentId = detailedSegment.SegmentId,
                    SegmentName = detailedSegment.Name,
                    ElapsedTime = dse.ElapsedTime,
                    SegmentPrTime = (int)detailedSegment.AthleteSegmentStats.PrElapsedTime,
                    Distance = Math.Round(CommonConversionHelpers.ConvertMetersToMiles(detailedSegment.Distance), 2),
                    AverageSpeed = CommonConversionHelpers.CalculateAverageSpeed(detailedSegment.Distance, dse.ElapsedTime),
                    ElevationGain = detailedSegment.TotalElevationGain,
                    AverageGrade = detailedSegment.AverageGrade,
                    MaximumGrade = detailedSegment.MaximumGrade,
                    AverageHeartRate = dse.AverageHeartrate,
                    KomTime = SegmentFormattingHelpers.GetTimeFromString(detailedSegment.Xoms.Kom),
                    QomTime = SegmentFormattingHelpers.GetTimeFromString(detailedSegment.Xoms.Qom),
                    AthleteCount = detailedSegment.AthleteCount,
                    EffortCount = detailedSegment.EffortCount,
                    StarCount = detailedSegment.StarCount,
                    PrRank = dse.PrRank,
                    CreatedDate = DateTime.UtcNow
                };
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
