using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data;
using SegmentSniper.Services.Common;

namespace SegmentSniper.Services.Garage
{
    public class DeleteBike : IDeleteBike
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public DeleteBike(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<DeleteResult> ExecuteAsync(DeleteBikeContract contract)
        {
            ValidateContract(contract);

            try
            {
                var equipmentToDelete = await _segmentSniperDbContext.Equipment
                    .Where(e => e.BikeId == contract.BikeId).ToListAsync();

                if (equipmentToDelete.Count > 0)
                {
                    _segmentSniperDbContext.Equipment.RemoveRange(equipmentToDelete);
                }

                var bikeToDelete = await _segmentSniperDbContext.Bikes
                    .FirstOrDefaultAsync(b => b.BikeId == contract.BikeId && b.UserId == contract.UserId);

                if (bikeToDelete == null)
                {
                    return new DeleteResult(false);
                }

                _segmentSniperDbContext.Bikes
                        .Remove(bikeToDelete);

                var numRows = _segmentSniperDbContext.SaveChanges();

                return new DeleteResult(numRows > 0);

            }
            catch (Exception ex)
            {
                return new DeleteResult(false);
            }
        }

        private void ValidateContract(DeleteBikeContract contract)
        {
            if (contract == null)
            {
                throw new ArgumentNullException(nameof(contract));
            }

            if (string.IsNullOrEmpty(contract.UserId))
            {
                throw new ArgumentException(nameof(contract.UserId));
            }

            if (string.IsNullOrEmpty(contract.BikeId))
            {
                throw new ArgumentException(nameof(contract.BikeId));
            }
        }
    }
}
