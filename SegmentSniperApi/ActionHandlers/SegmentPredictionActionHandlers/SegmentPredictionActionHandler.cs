using AutoMapper;
using SegmentSniper.Data;
using SegmentSniper.MachineLearning;
using SegmentSniper.Models.MachineLearning;
using SegmentSniper.Models.Models.Strava.Segment;
using Serilog;
using StravaApiClient;
using StravaApiClient.Models.Segment;
using StravaApiClient.Services.Segment;

namespace SegmentSniper.Api.ActionHandlers.SegmentPredictionActionHandlers
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
            var token = _context.StravaTokens.Where(t => t.UserId == request.UserId).FirstOrDefault();
            if (token != null)
            {
                try
                {
                    _stravaRequestService.UserId = request.UserId;
                    _stravaRequestService.RefreshToken = token.RefreshToken;

                    var response = await _stravaRequestService.GetDetailedSegmentById(new GetDetailedSegmentByIdContract(request.SegmentId));

                    DetailedSegment segment = _mapper.Map<DetailedSegmentApiModel, DetailedSegment>(response.DetailedSegmentApiModel);
                    var predictionModelExists = _context.ML_SegmentPredictionModels
                        .Any(m => m.UserId == request.UserId);
                    if (predictionModelExists != null)
                    {
                        var segmentToPredict = new SegmentDetailDataForPrediction
                        {
                            //  PreviousEffortTime = segment.AthleteSegmentStats.PrElapsedTime                        
                            Distance = (float)segment.Distance,
                            AverageGradient = (float)segment.AverageGrade,
                            ElevationGain = (float)segment.TotalElevationGain
                        };

                       var segmentPrediction = await _segmentPredictionDataProcessor.PredictSegmentEffort(segmentToPredict, request.UserId);

                        return new SegmentPredictionRequest.Response
                        {
                            PredictedTime = (int)segmentPrediction
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
