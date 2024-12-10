using SegmentSniper.Data;

namespace SegmentSniper.Services.Garage
{
    public class AddBikeActivity : IAddBikeActivity
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public AddBikeActivity(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<AddBikeActivityContract.Result> ExecuteAsync(AddBikeActivityContract contract)
        {
            ValidateContract(contract);

            throw new NotImplementedException();
        }

        private void ValidateContract(AddBikeActivityContract contract)
        {
            if (contract == null)
            {
                throw new ArgumentNullException(nameof(contract));
            }
            if (string.IsNullOrEmpty(contract.BikeId))
            {
                throw new ArgumentNullException(nameof(contract.BikeId));
            }
            if (contract.DistanceInMeters <= 0)
            {
                throw new ArgumentNullException(nameof(contract.DistanceInMeters));
            }
            if (string.IsNullOrEmpty(contract.ActivityId))
            {
                throw new ArgumentNullException(nameof(contract.ActivityId));
            }
            if (contract.ActivityDate == null)
            {
                throw new ArgumentNullException(nameof(contract.ActivityDate));
            }
            if (contract.ActivityDate > DateTime.UtcNow)
            {
                throw new ArgumentOutOfRangeException(nameof(contract.ActivityDate), "Date must be today or in the past");
            }

        }
    }
}
