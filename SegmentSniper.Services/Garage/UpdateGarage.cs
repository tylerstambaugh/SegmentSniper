using IdentityModel;
using SegmentSniper.Data;
using StravaApiClient;
using StravaApiClient.Services.Activity;

namespace SegmentSniper.Services.Garage
{
    public class UpdateGarage : IUpdateGarage
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;
        private readonly IStravaRequestService _stravaRequestService;

        public UpdateGarage(ISegmentSniperDbContext segmentSniperDbContext, IStravaRequestService stravaRequestService)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
            stravaRequestService = stravaRequestService;
        }

        public async Task<UpdateGarageContract.Result> ExecuteAsync(UpdateGarageContract contract)
        {
            ValidateContract(contract);

            var activities = _stravaRequestService.GetSummaryActivityForTimeRange(
                new GetSummaryActivityForTimeRangeContract((int)DateTime.UtcNow.AddDays(-180).ToEpochTime(), (int)DateTime.UtcNow.AddDays(1).ToEpochTime(), 365));

            var existingBike = _segmentSniperDbContext.Bikes.Where(b => b.UserId == contract.UserId);
            var existingBikeActivies = _segmentSniperDbContext.BikeActivities.Where(b => b.UserId == contract.UserId);

            throw new NotImplementedException();
        }

        private void ValidateContract(UpdateGarageContract contract)
        {
            if (contract == null)
            {
                throw new ArgumentNullException(nameof(contract));
            }

            if (string.IsNullOrEmpty(contract.UserId))
            {
                throw new ArgumentNullException(nameof(contract.UserId));
            }
        }
    }
}
