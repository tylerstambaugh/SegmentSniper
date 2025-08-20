using AutoMapper;
using SegmentSniper.Data;
using SegmentSniper.Models.Strava.Segment;
using SegmentSniper.Models.UIModels.Segment;
using SegmentSniper.Services.Common;
using StravaApiClient;
using StravaApiClient.Models.Segment;
using StravaApiClient.Services.Activity;
using StravaApiClient.Services.Segment;
using System.Text.RegularExpressions;
using static SegmentSniper.Services.Common.SegmentFormattingHelpers;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.Sniper
{
    [Obsolete]
    public class SnipeSegmentsActionHandler : ISnipeSegmentsActionHandler
    {
        private readonly ISegmentSniperDbContext _context;
        private readonly IStravaRequestService _stravaRequestService;
        private readonly IMapper _mapper;
        public SnipeSegmentsActionHandler(ISegmentSniperDbContext context, IStravaRequestService stravaRequestService, IMapper mapper)
        {
            _context = context;
            _stravaRequestService = stravaRequestService;
            _mapper = mapper;
        }

        public async Task<SnipeSegmentsRequest.Response> Handle(SnipeSegmentsRequest request)
        {
            ValidateRequest(request);
            var token = _context.StravaAthleteInfo.Where(t => t.AuthUserId == request.UserId).FirstOrDefault();
            if (token.StravaRefreshToken != null)
            {
                try
                {
                    _stravaRequestService.UserId = request.UserId;                   
                    _stravaRequestService.RefreshToken = token.StravaRefreshToken;
                    //get detailed activity by Id
                    var response = await _stravaRequestService.GetDetailedActivityById(new GetDetailedActivityByIdContract(request.ActivityId));

                    //build list of each detailed segment effort from detailed activity
                    List<DetailedSegmentEffort> segmentEfforts = new List<DetailedSegmentEffort>();
                    foreach (DetailedSegmentEffortApiModel dse in response.DetailedActivity.SegmentEfforts)
                    {
                        DetailedSegmentEffort segmentEffort = _mapper.Map<DetailedSegmentEffortApiModel, DetailedSegmentEffort>(dse);
                        segmentEfforts.Add(segmentEffort);
                    }

                    //limiting the list to 5 for testing to not blow up API call count
                    segmentEfforts = segmentEfforts.GetRange(0, 10);

                    List<DetailedSegment> segmentModels = new List<DetailedSegment>();
                    List<SnipeSegment> snipedSegments = new List<SnipeSegment>();

                    foreach (DetailedSegmentEffort segmentEffortModel in segmentEfforts)
                    {
                        //get detailed segment for each segment Id
                        var detailedSegmentResponse = await _stravaRequestService.GetDetailedSegmentById(new GetDetailedSegmentByIdContract(segmentEffortModel.SummarySegment.Id));
                        DetailedSegment model = _mapper.Map<DetailedSegmentApiModel, DetailedSegment>(detailedSegmentResponse.DetailedSegmentApiModel);
                        segmentModels.Add(model);

                        //do sniping on list of segments
                        XomsTimes xomsTime = (XomsTimes)SegmentFormattingHelpers.GetXomTimeFromStrings(model.Xoms);
                        int segementLeaderTime;

                        if (request.UseQom)
                        {
                            segementLeaderTime = xomsTime.QomTime;
                        }
                        else
                        {
                            segementLeaderTime = xomsTime.KomTime;
                        }

                        double percentageOff = Math.Round((double)((segmentEffortModel.MovingTime - segementLeaderTime) / (double)segementLeaderTime), 3) * 100;

                        int secondsOff = segmentEffortModel.MovingTime - segementLeaderTime;


                        SnipeSegment UiModel = new SnipeSegment
                        {
                            SegmentId = model.SegmentId,
                            Name = model.Name,
                            //PercentageFromLeader = Math.Round(percentageOff, 0),
                            //SecondsFromLeader = secondsOff,
                            ActivityType = model.ActivityType,
                            Distance = Math.Round(CommonConversionHelpers.ConvertMetersToMiles(model.Distance), 2),
                            KomTime = model.Xoms.Kom,
                            CreatedAt = model.CreatedAt,
                            Map = model.Map,
                            EffortCount = model.EffortCount,
                            DetailedSegmentEffort = segmentEffortModel,
                            AthleteCount = model.AthleteCount,
                            Starred = model.Starred,
                            StarCount = model.StarCount,
                            AthleteSegmentStats = new AthleteSegmentStatsUiModel
                            {
                                PrActivityId = model.AthleteSegmentStats.PrActivityId,
                                PrDate = model.AthleteSegmentStats.PrDate,
                                EffortCount = model.AthleteSegmentStats.EffortCount,
                                PrElapsedTime = ConvertTimeInSeconds(model.AthleteSegmentStats.EffortCount),
                            },
                            Xoms = model.Xoms,
                        };

                        if (percentageOff < request.PercentageFromKom || secondsOff < request.SecondsFromKom)
                        {
                            snipedSegments.Add(UiModel);
                        }
                    }

                    return new SnipeSegmentsRequest.Response(snipedSegments);
                }
                catch (Exception e)
                {
                    throw new Exception(e.Message);
                }
            }
            else
            {
                throw new ApplicationException("Something went wrong 'handling the request");
            }

        }

        //private XomsTimes GetXomTimeFromStrings(Xoms xoms)
        //{
        //    return new XomsTimes
        //    {
        //        KomTime = GetTimeFromString(xoms.Kom),
        //        QomTime = GetTimeFromString(xoms.Qom)
        //    };
        //}

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

        //private class XomsTimes
        //{
        //    public int KomTime { get; set; }
        //    public int QomTime { get; set; }
        //}

        private string ConvertTimeInSeconds(int seconds)
        {            
            int hours = seconds / 3600;
            int minutes = seconds / 60 - (hours * 60);
            int remainingSeconds = seconds - ((hours * 3600) + (minutes * 60));
            return $"{hours:D2}:{minutes:D2}:{remainingSeconds:D2}";
        }

        private void ValidateRequest(SnipeSegmentsRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }
            if (string.IsNullOrWhiteSpace(request.ActivityId))
            {
                throw new ArgumentNullException(nameof(request.ActivityId), "Activity Id must be provided");
            }
        }
    }
}
