using IdentityModel;
using SegmentSniper.Data;
using SegmentSniper.Models.Models.Garage;

namespace SegmentSniper.Services.Garage
{
    public class ImportGarage : IImportGarage
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public ImportGarage(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<ImportGarageContract.Result> ExecuteAsync(ImportGarageContract contract)
        {
            ValidateContract(contract);

            var existingBikes = _segmentSniperDbContext.Bikes.Where(b => b.UserId == contract.UserId);
            var existingBikeActivies = _segmentSniperDbContext.BikeActivities.Where(b => b.UserId == contract.UserId);

            return new ImportGarageContract.Result(new List<BikeModel>());
        }

        private void ValidateContract(ImportGarageContract contract)
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
