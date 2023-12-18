using AutoMapper;
using SegmentSniper.Data;
using SegmentSniper.Models.Models.Strava.Activity;
using SegmentSniper.Models.Models.Strava.Segment;
using SegmentSniper.Models.UIModels.Segment;
using SegmentSniper.Services.Common;
using StravaApiClient;
using StravaApiClient.Models.Activity;
using StravaApiClient.Models.Segment;
using StravaApiClient.Services.Activity;
using StravaApiClient.Services.Segment;
using System.Text.RegularExpressions;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public class GetSnipeSegmentsByActivityIdActionHandler : IGetSnipeSegmentsByActivityIdActionHandler
    {

        private readonly ISegmentSniperDbContext _context;
        private readonly IStravaRequestService _stravaRequestService;
        private readonly IMapper _mapper;


        public GetSnipeSegmentsByActivityIdActionHandler(ISegmentSniperDbContext context, IStravaRequestService stravaRequestService, IMapper mapper)
        {
            _context = context;
            _stravaRequestService = stravaRequestService;
            _mapper = mapper;
        }

        public async Task<GetSnipeSegmentsByActivityIdRequest.Response> HandleAsync(GetSnipeSegmentsByActivityIdRequest request)
        {
            ValidateRequest(request);

            var token = _context.StravaToken.Where(t => t.UserId == request.UserId).FirstOrDefault();
            if (token != null)
            {
                try
                {
                    _stravaRequestService.UserId = request.UserId;
                    _stravaRequestService.RefreshToken = token.RefreshToken;

                    var activityResponse = await _stravaRequestService.GetDetailedActivityById(new GetDetailedActivityByIdContract(request.ActivityId));
                    DetailedActivity activity = _mapper.Map<DetailedActivityApiModel, DetailedActivity>(activityResponse.DetailedActivity);

                    List<SnipeSegment> snipeSegments = new List<SnipeSegment>();

                    foreach (DetailedSegmentEffort dse in activity.SegmentEfforts)
                    {
                        var detailedSegmentResponse = await _stravaRequestService.GetDetailedSegmentById(new GetDetailedSegmentByIdContract(dse.SummarySegment.Id));
                        DetailedSegment detailedSegment = _mapper.Map<DetailedSegmentApiModel, DetailedSegment>(detailedSegmentResponse.DetailedSegmentApiModel);

                        var snipeSegment = CreateSnipeSegmentFromDetails(dse, detailedSegment);
                        snipeSegment.ActivityId = activity.ActivityId;
                        snipeSegments.Add(snipeSegment);
                    }

                    return new GetSnipeSegmentsByActivityIdRequest.Response(snipeSegments);
                }
                catch (Exception ex)
                {
                    //do something different here instead of throwing the exception. log it and return null?
                    throw new ApplicationException("Something went wrong handling the request.", ex);
                }
            }
            else
            {
                throw new ApplicationException("Something went wrong 'handling the request");
            }
        }

        private SnipeSegment CreateSnipeSegmentFromDetails(DetailedSegmentEffort dse, DetailedSegment detailedSegment)
        {
            XomsTimes xomsTime = GetXomTimeFromStrings(detailedSegment.Xoms);

            double percentageOffKom = Math.Round((double)((dse.MovingTime - xomsTime.KomTime) / (double)xomsTime.KomTime), 3) * 100;
            double percentageOffQom = Math.Round((double)((dse.MovingTime - xomsTime.QomTime) / (double)xomsTime.QomTime), 3) * 100;

            int secondsOffKom = dse.MovingTime - xomsTime.KomTime;
            int secondsOffQom = dse.MovingTime - xomsTime.QomTime;

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
                SecondsFromKom = ConvertTimeInSeconds(secondsOffKom),
                SecondsFromQom = ConvertTimeInSeconds(secondsOffQom),
                ActivityType = detailedSegment.ActivityType,
                Distance = Math.Round(CommonConversionHelpers.ConvertMetersToMiles(detailedSegment.Distance), 2),
                CreatedAt = detailedSegment.CreatedAt,
                Map = detailedSegment.Map,
                EffortCount = detailedSegment.EffortCount,
                AthleteCount = detailedSegment.AthleteCount,
                Starred = detailedSegment.Starred,
                StarCount = detailedSegment.StarCount,
                AthleteSegmentStats = _mapper.Map<AthleteSegmentStats, AthleteSegmentStatsUiModel>(detailedSegment.AthleteSegmentStats),
                Xoms = detailedSegment.Xoms,
                LocalLegend = detailedSegment.LocalLegend,
            };

            return snipeSegment;
        }

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
            return $"{hours:D2}:{minutes:D2}:{remainingSeconds:D2}";
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
