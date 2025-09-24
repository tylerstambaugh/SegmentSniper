using AutoMapper;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities.Segments;
using SegmentSniper.Models.Strava.Activity;
using SegmentSniper.Models.Strava.Segment;
using SegmentSniper.Models.UIModels.Segment;
using SegmentSniper.Services.Common;
using SegmentSniper.Services.MachineLearning;
using StravaApiClient;
using StravaApiClient.Models.Activity;
using StravaApiClient.Models.Segment;
using StravaApiClient.Services.Activity;
using StravaApiClient.Services.Segment;
using System.Text.RegularExpressions;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.Sniper
{
    public class GetSnipeSegmentsByActivityIdActionHandler : IGetSnipeSegmentsByActivityIdActionHandler
    {

        private readonly ISegmentSniperDbContext _context;
        private readonly IStravaRequestService _stravaRequestService;
        private readonly ISaveSegmentPredictionTrainingData _saveSegmentPredictionTrainingData;
        private readonly IMapper _mapper;
        private string _userId;


        public GetSnipeSegmentsByActivityIdActionHandler(ISegmentSniperDbContext context, IStravaRequestService stravaRequestService, ISaveSegmentPredictionTrainingData saveSegmentPredictionTrainingData, IMapper mapper)
        {
            _context = context;
            _stravaRequestService = stravaRequestService;
            _saveSegmentPredictionTrainingData = saveSegmentPredictionTrainingData;
            _mapper = mapper;
        }

        public async Task<ApiResponse<GetSnipeSegmentsByActivityIdRequest.Response>> HandleAsync(GetSnipeSegmentsByActivityIdRequest request)
        {
            ValidateRequest(request);
            _userId = request.UserId;

            var token = _context.Users.Where(t => t.AuthUserId == _userId).FirstOrDefault();
            if (token != null)
            {
                try
                {
                    _stravaRequestService.UserId = request.UserId;
                    _stravaRequestService.RefreshToken = token.StravaRefreshToken;

                    var activityResponse = await _stravaRequestService.GetDetailedActivityById(new GetDetailedActivityByIdContract(request.ActivityId));
                    DetailedActivity activity = _mapper.Map<DetailedActivityApiModel, DetailedActivity>(activityResponse.DetailedActivity);

                    List<SnipeSegment> snipeSegments = new List<SnipeSegment>();
                    List<ML_SegmentEffort> MlSegmentEfforts = new List<ML_SegmentEffort>();

                    foreach (DetailedSegmentEffort dse in activity.SegmentEfforts)
                    {
                        var detailedSegmentResponse = await _stravaRequestService.GetDetailedSegmentById(new GetDetailedSegmentByIdContract(dse.SummarySegment.Id));
                        DetailedSegment detailedSegment = _mapper.Map<DetailedSegmentApiModel, DetailedSegment>(detailedSegmentResponse.DetailedSegmentApiModel);

                        var snipeSegment = CreateSnipeSegmentFromDetails(dse, detailedSegment);
                        snipeSegment.ActivityId = activity.ActivityId;
                        snipeSegments.Add(snipeSegment);

                        MlSegmentEfforts.Add(CreateMlSegmentEffort(dse, detailedSegment));
                    }

                    await _saveSegmentPredictionTrainingData.ExecuteAsync(new SaveSegmentPredictionTrainingDataContract(MlSegmentEfforts));

                    return new ApiResponse<GetSnipeSegmentsByActivityIdRequest.Response>(200, new GetSnipeSegmentsByActivityIdRequest.Response(snipeSegments));
                }
                catch (Exception ex)
                {
                    return new ApiResponse<GetSnipeSegmentsByActivityIdRequest.Response>(500, null, ex.Message);
                }
            }
            else
            {
                return new ApiResponse<GetSnipeSegmentsByActivityIdRequest.Response>(500, null);
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
                };
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        private SnipeSegment CreateSnipeSegmentFromDetails(DetailedSegmentEffort dse, DetailedSegment detailedSegment)
        {
            try
            {

                XomsTimes xomsTime = GetXomTimeFromStrings(detailedSegment.Xoms);

                int? percentageOffKom = xomsTime.KomTime != null ?
                    (int)Math.Round((double)((dse.MovingTime - xomsTime.KomTime) / (double)xomsTime.KomTime) * 100, 3, MidpointRounding.ToEven)
                    : null;
                int? prPercentageOffKom = xomsTime.KomTime != null ?
                    (int)Math.Round((double)((detailedSegment.AthleteSegmentStats.PrElapsedTime - xomsTime.KomTime) / (double)xomsTime.KomTime) * 100, 3, MidpointRounding.ToEven)
                    : null;
                int? percentageOffQom = xomsTime.QomTime != null ?
                    (int)Math.Round((double)((dse.MovingTime - xomsTime.QomTime) / (double)xomsTime.QomTime) * 100, 3, MidpointRounding.ToEven)
                    : null;
                int? prPercentageOffQom = xomsTime.QomTime != null ?
                    (int)Math.Round((double)((detailedSegment.AthleteSegmentStats.PrElapsedTime - xomsTime.QomTime) / (double)xomsTime.QomTime) * 100, 3, MidpointRounding.ToEven)
                    : null;

                int? secondsOffKom = xomsTime.KomTime != null ? dse.MovingTime - xomsTime.KomTime : null;
                int? prSecondsOffKom = (detailedSegment.AthleteSegmentStats.PrElapsedTime != null && xomsTime.KomTime != null) ?
                    detailedSegment.AthleteSegmentStats.PrElapsedTime - xomsTime.KomTime :
                    null;
                int? secondsOffQom = xomsTime.QomTime != null ? dse.MovingTime - xomsTime.QomTime : null;
                int? prSecondsOffQom = (detailedSegment.AthleteSegmentStats.PrElapsedTime != null && xomsTime.QomTime != null) ?
                    detailedSegment.AthleteSegmentStats.PrElapsedTime - xomsTime.QomTime :
                    null;


                SnipeSegment snipeSegment = new SnipeSegment
                {
                    ActivityId = dse.ActivityId,
                    DetailedSegmentEffort = dse,
                    SegmentId = dse.SummarySegment.Id,
                    Name = dse.Name,
                    KomTime = SegmentFormattingHelpers.ConvertTimeInSeconds(xomsTime?.KomTime ?? 0),
                    QomTime = SegmentFormattingHelpers.ConvertTimeInSeconds(xomsTime?.QomTime ?? 0),
                    PercentageFromKom = percentageOffKom,
                    PercentageFromQom = percentageOffQom,
                    PrPercentageFromKom = prPercentageOffKom,
                    PrPercentageFromQom = prPercentageOffQom,
                    TimeFromKom = secondsOffKom != null ? SegmentFormattingHelpers.ConvertTimeInSeconds((int)secondsOffKom) : null,
                    TimeFromQom = secondsOffQom != null ? SegmentFormattingHelpers.ConvertTimeInSeconds((int)secondsOffQom) : null,
                    SecondsFromKom = secondsOffKom,
                    SecondsFromQom = secondsOffQom,
                    PrSecondsFromKom = prSecondsOffKom != null ? SegmentFormattingHelpers.ConvertTimeInSeconds((int)prSecondsOffKom) : null,
                    PrSecondsFromQom = prSecondsOffQom != null ? SegmentFormattingHelpers.ConvertTimeInSeconds((int)prSecondsOffQom) : null,
                    ActivityType = detailedSegment.ActivityType,
                    Distance = Math.Round(CommonConversionHelpers.ConvertMetersToMiles(detailedSegment.Distance), 2),
                    Elevation = Math.Round(dse.SummarySegment.ElevationHigh - dse.SummarySegment.ElevationLow, 0),
                    CreatedAt = detailedSegment.CreatedAt,
                    Map = detailedSegment.Map,
                    EffortCount = detailedSegment.EffortCount,
                    AthleteCount = detailedSegment.AthleteCount,
                    Starred = detailedSegment.Starred,
                    StarCount = detailedSegment.StarCount,
                    AthleteSegmentStats = _mapper.Map<AthleteSegmentStats, AthleteSegmentStatsUiModel>(detailedSegment.AthleteSegmentStats),
                    Xoms = detailedSegment.Xoms,
                    LocalLegend = detailedSegment.LocalLegend,
                    Heading = HeadingCalculator.CalculateBearing(dse.SummarySegment.StartLatlng, dse.SummarySegment.EndLatlng),
                };

                return snipeSegment;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        //convert all of these into a helpers class

        private XomsTimes GetXomTimeFromStrings(Xoms xoms)
        {
            return new XomsTimes
            {
                KomTime = SegmentFormattingHelpers.GetTimeFromString(xoms.Kom),
                QomTime = SegmentFormattingHelpers.GetTimeFromString(xoms.Qom)
            };
        }  

        private class XomsTimes
        {
            public int? KomTime { get; set; }
            public int? QomTime { get; set; }
        }

        private void ValidateRequest(GetSnipeSegmentsByActivityIdRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            if (string.IsNullOrWhiteSpace(request.ActivityId))
            {
                throw new ArgumentException(nameof(request.ActivityId), "ActivityId Id cannot be empty");
            }

            if (string.IsNullOrWhiteSpace(request.UserId))
            {
                throw new ArgumentException(nameof(request.UserId), "User Id cannot be empty");
            }
        }
    }
}
