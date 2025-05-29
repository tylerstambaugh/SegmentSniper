using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data;
using SegmentSniper.Services.Garage.Equipment;

namespace SegmentSniper.Services.Garage
{
    public class DeleteBike : IDeleteBike
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public DeleteBike(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<DeleteBikeContract.Result> ExecuteAsync(DeleteBikeContract contract)
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
                    return new DeleteBikeContract.Result { Success = false };
                }
               
                _segmentSniperDbContext.Bikes
                        .Remove(bikeToDelete);

                var numRows = _segmentSniperDbContext.SaveChanges();

                return new DeleteBikeContract.Result { Success = numRows > 0 };
                
            }
            catch (Exception ex)
            {
                return new DeleteBikeContract.Result { Success = false };
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
