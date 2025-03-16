using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities.Segments;
using SegmentSniper.Models.Models.Strava.Activity;
using SegmentSniper.Models.Models.Strava.Segment;
using SegmentSniper.Models.UIModels.Segment;
using SegmentSniper.Services.Common;
using SegmentSniper.Services.MachineLearning;
using StravaApiClient;
using StravaApiClient.Models.Activity;
using StravaApiClient.Models.Segment;
using StravaApiClient.Services.Activity;
using StravaApiClient.Services.Segment;
using System.Drawing;
using System.Text.RegularExpressions;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public class GetSnipeSegmentsByActivityIdActionHandler : IGetSnipeSegmentsByActivityIdActionHandler
    {

        private readonly ISegmentSniperDbContext _context;
        private readonly IStravaRequestService _stravaRequestService;
        private readonly ISaveSegmentPredictionTrainingData _saveSegmentPredictionTrainingData;
        private readonly IMapper _mapper;
        private string _userId;


        public GetSnipeSegmentsByActivityIdActionHandler(ISegmentSniperDbContext context, IStravaRequestService stravaRequestService, ISaveSegmentPredictionTrainingData saveSegmentPredictionTrainingData , IMapper mapper)
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

            var token = _context.StravaTokens.Where(t => t.UserId == _userId).FirstOrDefault();
            if (token != null)
            {
                try
                {
                    _stravaRequestService.UserId = request.UserId;
                    _stravaRequestService.RefreshToken = token.RefreshToken;

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
                    UserId = _userId,
                    StravaSegmentEffortId = dse.SegmentEffortId,
                    StravaSegmentId = detailedSegment.SegmentId,
                    SegmentName = detailedSegment.Name,
                    ElapsedTime = dse.ElapsedTime,
                    SegmentPrTime = detailedSegment.AthleteSegmentStats.PrElapsedTime,
                    Distance = Math.Round(CommonConversionHelpers.ConvertMetersToMiles(detailedSegment.Distance), 2),
                    AverageSpeed = CalculateAverageSpeed(detailedSegment.Distance, dse.ElapsedTime),
                    ElevationGain = detailedSegment.TotalElevationGain,
                    AverageGrade = detailedSegment.AverageGrade,
                    MaximumGrade = detailedSegment.MaximumGrade,
                    AverageHeartRate = dse.AverageHeartrate,
                    KomTime = GetTimeFromString(detailedSegment.Xoms.Kom),
                    QomTime = GetTimeFromString(detailedSegment.Xoms.Qom),
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

                int percentageOffKom = (int)Math.Round((double)((dse.MovingTime - xomsTime.KomTime) / (double)xomsTime.KomTime) * 100, 3, MidpointRounding.ToEven);
                int prPercentageOffKom = (int)Math.Round((double)((detailedSegment.AthleteSegmentStats.PrElapsedTime - xomsTime.KomTime) / (double)xomsTime.KomTime) * 100, 3, MidpointRounding.ToEven);
                int percentageOffQom = (int)Math.Round((double)((dse.MovingTime - xomsTime.QomTime) / (double)xomsTime.QomTime) * 100, 3, MidpointRounding.ToEven);
                int prPercentageOffQom = (int)Math.Round((double)((detailedSegment.AthleteSegmentStats.PrElapsedTime - xomsTime.QomTime) / (double)xomsTime.QomTime) * 100, 3, MidpointRounding.ToEven);

                int secondsOffKom = dse.MovingTime - xomsTime.KomTime;
                int prSecondsOffKom = detailedSegment.AthleteSegmentStats.PrElapsedTime - xomsTime.KomTime;
                int secondsOffQom = dse.MovingTime - xomsTime.QomTime;
                int prSecondsOffQom = detailedSegment.AthleteSegmentStats.PrElapsedTime - xomsTime.QomTime;

                SnipeSegment snipeSegment = new SnipeSegment
                {
                    ActivityId = dse.ActivityId,
                    DetailedSegmentEffort = dse,
                    SegmentId = dse.SummarySegment.Id,
                    Name = dse.Name,
                    KomTime = ConvertTimeInSeconds(xomsTime.KomTime),
                    QomTime = ConvertTimeInSeconds(xomsTime.QomTime),
                    PercentageFromKom = percentageOffKom,
                    PercentageFromQom = percentageOffQom,
                    PrPercentageFromKom = prPercentageOffKom,
                    PrPercentageFromQom = prPercentageOffQom,
                    TimeFromKom = ConvertTimeInSeconds(secondsOffKom),
                    TimeFromQom = ConvertTimeInSeconds(secondsOffQom),
                    SecondsFromKom = secondsOffKom,
                    SecondsFromQom = secondsOffQom,
                    PrSecondsFromKom = ConvertTimeInSeconds(prSecondsOffKom),
                    PrSecondsFromQom = ConvertTimeInSeconds(prSecondsOffQom),
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
                KomTime = GetTimeFromString(xoms.Kom),
                QomTime = GetTimeFromString(xoms.Qom)
            };
        }

        private int GetTimeFromString(string time)
        {
            time = RemoveLetters(time);

            int returnTime = 0;
            string[] timeParts = time.Split(':');

            for (int i = 0; i <= timeParts.Length - 1; i++)
            {
                int factor = (int)Math.Pow(60, i);
                returnTime += int.Parse(timeParts[timeParts.Length - (i + 1)]) * factor;
            }
            return returnTime;
        }

        private string RemoveLetters(string input)
        {
            Regex regex = new Regex("[^0-9:]");
            return regex.Replace(input, "");
        }

        private class XomsTimes
        {
            public int KomTime { get; set; }
            public int QomTime { get; set; }
        }

        private string ConvertTimeInSeconds(int seconds)
        {
            int hours = seconds / 3600;
            int minutes = seconds / 60 - (hours * 60);
            int remainingSeconds = seconds - ((hours * 3600) + (minutes * 60));

            var timeAsString = "";
            if(hours > 0)
            {
                timeAsString = $"{hours:D2}:{minutes:D2}:{Math.Abs(remainingSeconds):D2}";
            }
            if(hours == 0)
            {
                timeAsString = $"{minutes:D2}:{Math.Abs(remainingSeconds):D2}";
            }
            if (remainingSeconds < 0)
            {
                timeAsString = $"-{timeAsString}";
            }

            return timeAsString;
        }

        public double CalculateAverageSpeed(double distanceInMeters, int timeInsecods)
        {
            double averageSpeed;
            double distanceInMiles = CommonConversionHelpers.ConvertMetersToMiles(distanceInMeters);
            double elapsedTimeInHours = timeInsecods / 3600.0; // Ensure floating-point division

            if (elapsedTimeInHours == 0)
            {
                // Handle division by zero error
                averageSpeed = 0; // Or throw an exception
            }
            else
            {
                averageSpeed = distanceInMiles / elapsedTimeInHours;
            }

            averageSpeed = Math.Round(averageSpeed, 2);

            return averageSpeed;
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
