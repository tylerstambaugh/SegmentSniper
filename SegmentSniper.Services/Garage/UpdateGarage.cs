using IdentityModel;
using SegmentSniper.Data;

namespace SegmentSniper.Services.Garage
{
    public class UpdateGarage : IUpdateGarage
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public UpdateGarage(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<UpdateGarageContract.Result> ExecuteAsync(UpdateGarageContract contract)
        {
            ValidateContract(contract);

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
