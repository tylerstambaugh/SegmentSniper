using AutoMapper;
using SegmentSniper.Data;
using SegmentSniper.MachineLearning;
using SegmentSniper.Models.MachineLearning;
using SegmentSniper.Models.Strava.Segment;
using SegmentSniper.Models.UIModels.Segment;
using SegmentSniper.Services.Common;
using Serilog;
using StravaApiClient;
using StravaApiClient.Models.Segment;
using StravaApiClient.Services.Segment;
using static SegmentSniper.Services.Common.SegmentFormattingHelpers;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.SegmentPrediction
{
    public class SegmentPredictionActionHandler : ISegmentPredictionActionHandler
    {
        private readonly ISegmentSniperDbContext _context;
        private readonly IStravaRequestService _stravaRequestService;

        private readonly ISegmentPredictionDataProcessor _segmentPredictionDataProcessor;
        private readonly IMapper _mapper;

        public SegmentPredictionActionHandler(
            ISegmentSniperDbContext context,
            IStravaRequestService stravaRequestService,
            ISegmentPredictionDataProcessor segmentPredictionDataProcessor,
            IMapper mapper)
        {
            _context = context;
            _stravaRequestService = stravaRequestService;
            _segmentPredictionDataProcessor = segmentPredictionDataProcessor;
            _mapper = mapper;
        }

        public async Task<SegmentPredictionRequest.Response> HandleAsync(SegmentPredictionRequest request)
        {

            ValidateRequest(request);
            var token = _context.StravaAthleteInfo.Where(t => t.UserId == request.UserId).FirstOrDefault();
            if (token != null)
            {
                try
                {
                    _stravaRequestService.UserId = request.UserId;
                    _stravaRequestService.RefreshToken = token.RefreshToken;

                    var response = await _stravaRequestService.GetDetailedSegmentById(new GetDetailedSegmentByIdContract(request.SegmentId));

                    DetailedSegment segment = _mapper.Map<DetailedSegmentApiModel, DetailedSegment>(response.DetailedSegmentApiModel);

                    var segmentUiModel = CreateSegmentUiModel(segment);
                    var predictionModelExists = _context.ML_SegmentPredictionModels
                        .Any(m => m.AuthUserId == request.UserId);
                    if (predictionModelExists != null)
                    {
                        var segmentToPredict = new SegmentDetailDataForPrediction
                        {
                            Distance = (float)segment.Distance,
                            AverageGrade = (float)segment.AverageGrade,
                            ElevationGain = (float)segment.TotalElevationGain,
                            MaximumGrade = (float)segment.MaximumGrade
                        };

                        var segmentPrediction = await _segmentPredictionDataProcessor.PredictSegmentEffort(segmentToPredict, request.UserId);

                        return new SegmentPredictionRequest.Response
                        {
                            PredictedTime = (int)segmentPrediction,
                            DetailedSegmentUIModel = segmentUiModel
                        };
                    }
                    else
                    {

                        throw new ApplicationException($"No segment prediction model for user {request.UserId}");
                    }
                }

                catch (Exception ex)
                {
                    //do something different here instead of throwing the exception. log it and return null?
                    Log.Debug($"Error handling segment prediction: ${ex.Message}");
                    throw new ApplicationException("Something went wrong handling the request.", ex);
                }
            }
            else
            {
                throw new ApplicationException($"No strava token for userId: {request.UserId}");
            }


        }

        private DetailedSegmentUIModel CreateSegmentUiModel(DetailedSegment segment)
        {
            XomsTimes xomsTime = GetXomTimeFromStrings(segment.Xoms);


            DetailedSegmentUIModel segmentUiModel = new DetailedSegmentUIModel
            {
                SegmentId = segment.SegmentId,
                Name = segment.Name,
                ActivityType = segment.ActivityType,
                Distance = Math.Round(CommonConversionHelpers.ConvertMetersToMiles(segment.Distance), 2),
                AverageGrade = segment.AverageGrade * 10,
                MaximumGrade = segment.MaximumGrade,
                ElevationHigh = segment.ElevationHigh,
                ElevationLow = segment.ElevationLow,
                StartLatlng = segment.StartLatlng,
                EndLatlng = segment.EndLatlng,
                ElevationProfile = segment.ElevationProfile,
                ClimbCategory = segment.ClimbCategory,
                City = segment.City,
                State = segment.State,
                Country = segment.Country,
                Private = segment.Private,
                Hazardous = segment.Hazardous,
                Starred = segment.Starred,
                CreatedAt = segment.CreatedAt,
                UpdatedAt = segment.UpdatedAt,
                TotalElevationGain = segment.TotalElevationGain,
                Map = segment.Map,
                EffortCount = segment.EffortCount,
                AthleteCount = segment.AthleteCount,
                StarCount = segment.StarCount,
                AthleteSegmentStats = segment.AthleteSegmentStats,
                Xoms = segment.Xoms,
                LocalLegend = segment.LocalLegend
            };

            return segmentUiModel;
        }

        private void ValidateRequest(SegmentPredictionRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            if (string.IsNullOrWhiteSpace(request.SegmentId))
            {
                throw new ArgumentException(nameof(request.SegmentId), "Segment Id cannot be empty");
            }

            if (string.IsNullOrWhiteSpace(request.UserId))
            {
                throw new ArgumentException(nameof(request.UserId), "User Id cannot be empty");
            }
        }
    }
}
