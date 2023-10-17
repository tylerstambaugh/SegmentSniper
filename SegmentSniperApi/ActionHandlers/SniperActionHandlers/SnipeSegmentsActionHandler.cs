using AutoMapper;
using Duende.IdentityServer.Validation;
using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data;
using SegmentSniper.Models.Models.Strava.Segment;
using SegmentSniper.Models.UIModels.Segment;
using SegmentSniper.Services.Common;
using StravaApiClient;
using StravaApiClient.Services.Activity;
using System.Diagnostics.Contracts;
using System.Text.RegularExpressions;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public class SnipeSegmentsActionHandler : ISnipeSegmentsActionHandler
    {
        private readonly ISegmentSniperDbContext _context;
        private readonly IStravaRequestService _stravaRequestService;
        private readonly IMapper _mapper;
        public SnipeSegmentsActionHandler( ISegmentSniperDbContext context, IStravaRequestService stravaRequestService, IMapper mapper)
        {
            _context = context;
            _stravaRequestService = stravaRequestService;
            _mapper = mapper;
        }

        public async Task<SnipeSegmentsRequest.Response> Handle(SnipeSegmentsRequest request)
        {
            ValidatedRequest(request);

            try
            {
                //get detailed activity by Id
                var detailedActivityModel = await _stravaRequestService.GetDetailedActivityById(new GetDetailedActivityByIdContract
                {
                    ActivityId = request.ActivityId
                };

                List<DetailedSegmentEffort> segmentEfforts = detailedActivityModel.SegmentEfforts;

                //limiting the list to 5 for testing to not blow up API call count
                segmentEfforts = segmentEfforts.GetRange(0, 10);

                List<DetailedSegment> segmentModels = new List<DetailedSegment>();
                List<SnipedSegment> snipedSegments = new List<SnipedSegment>();

                foreach (DetailedSegmentEffort segmentEffortModel in segmentEfforts)
                {
                    //get detailed segments for each segment Id
                    DetailedSegment model = _stravaRequestService.GetDetailedSegmentById(segmentEffortModel.Segment.Id, userId).Result;
                    segmentModels.Add(model);

                    //do sniping on list of segments
                    XomsTimes xomsTime = GetXomTimeFromStrings(model.Xoms);
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


                    SnipedSegment UiModel = new SnipedSegment
                    {
                        SegmentId = model.SegmentId,
                        Name = model.Name,
                        PercentageFromLeader = Math.Round(percentageOff, 0),
                        SecondsFromLeader = secondsOff,
                        ActivityType = model.ActivityType,
                        Distance = Math.Round(CommonConversionHelpers.ConvertMetersToMiles(model.Distance), 2),
                        KomTime = model.Xoms.Kom,
                        CreatedAt = model.CreatedAt,
                        Map = model.Map,
                        EffortCount = model.EffortCount,
                        AthleteCount = model.AthleteCount,
                        Starred = model.Starred,
                        StarCount = model.StarCount,
                        AthleteSegmentStats = model.AthleteSegmentStats,
                        Xoms = model.Xoms,
                    };

                    if (percentageOff < request.PercentageFromKom || secondsOff < request.SecondsFromKom)
                    {
                        snipedSegments.Add(UiModel);
                    }
                }

                return snipedSegments;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }



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

        private void ValidatedRequest(SnipeSegmentsRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }
            if (request.ActivityId == null)
            {
                throw new ArgumentNullException(nameof(request.ActivityId), "Activity Id cannot be null");
            }
        }
    }
}
