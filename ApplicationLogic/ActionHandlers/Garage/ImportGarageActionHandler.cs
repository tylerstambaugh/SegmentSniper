

using AutoMapper;
using SegmentSniper.Data;
using SegmentSniper.Models.Models.Garage;
using SegmentSniper.Services.Common;
using SegmentSniper.Services.Common.Adapters;
using SegmentSniper.Services.Garage;
using Serilog;
using StravaApiClient;
using StravaApiClient.Models.Misc;
using StravaApiClient.Services.Activity;
using StravaApiClient.Services.Gear;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.Garage
{
    public class ImportGarageActionHandler : IImportGarageActionHandler
    {

        private readonly IStravaRequestService _stravaRequestService;
        private readonly IMapper _mapper;
        private readonly ISegmentSniperDbContext _context;
        private readonly IImportGarage _importGarage;
        private readonly int MaxActivities = 200;

        public ImportGarageActionHandler(ISegmentSniperDbContext context, IImportGarage importGarage, IStravaRequestService stravaRequestService,
            IMapper mapper, IActivityAdapter activityAdapter)
        {
            _context = context;
            _importGarage = importGarage;
            _stravaRequestService = stravaRequestService;
            _mapper = mapper;
        }

        public async Task<ImportGarageRequest.Response> ExecuteAsync(ImportGarageRequest request)
        {
            ValidateRequest(request);
            var token = _context.StravaTokens.Where(t => t.UserId == request.UserId).FirstOrDefault();
            if (token != null && token.RefreshToken != null)
            {
                try
                {
                    _stravaRequestService.UserId = request.UserId;
                    _stravaRequestService.RefreshToken = token.RefreshToken;
                    var startDate = CommonConversionHelpers.ConvertToEpochTime(DateTime.Now.AddYears(-1));
                    var endDate = CommonConversionHelpers.ConvertToEpochTime(DateTime.Now);

                    //get activities for last ~year
                    var summaryActivityContract = new GetSummaryActivityForTimeRangeContract(startDate, endDate, MaxActivities);
                    var stravaActivities = await _stravaRequestService.GetSummaryActivityForTimeRange(summaryActivityContract);


                    //create records of all the bikes.
                    var bikeIds = stravaActivities.SummaryActivities.Where(a => a.GearId != null).Select(a => a.GearId).Distinct().ToList();

                    var bikes = new List<BikeModel>();
                    foreach (var bikeId in bikeIds)
                    {
                        var bikeContract = new GetGearByIdContract(bikeId);
                        var result = await _stravaRequestService.GetGearById(bikeContract);

                        bikes.Add(_mapper.Map<DetailedGearApiModel, BikeModel>(result.DetailedGearApiModel));
                    }

                    var importBikesContract = new ImportGarageContract(request.UserId, bikes);

                    var importResult = await _importGarage.ExecuteAsync(importBikesContract);

                    //return list of bikes that were added
                    return new ImportGarageRequest.Response(importResult.Bikes);
                }
                catch (Exception ex)
                {
                    //do something different here instead of throwing the exception. log it and return null?
                    Log.Error($"Import Garage error: {ex.Message}");
                    throw new ApplicationException($"ImportGarage Error \n Details: {ex.Message}");
                }

            }
            else
            {
                throw new ApplicationException("Invalid or missing Strava Authorization");
            }
        }

        private void ValidateRequest(ImportGarageRequest request)
        {
            if(request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            if(string.IsNullOrEmpty(request.UserId))
            {
                throw new ArgumentNullException(nameof(request.UserId));
            }
        }
    }
}
