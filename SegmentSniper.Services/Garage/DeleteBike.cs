﻿using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities.Equiment;
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

            var result = new DeleteResult(false);
            try            
            {

                foreach (var bikeId in contract.BikeIds)
                {

                    var equipmentToDelete = await _segmentSniperDbContext.Equipment
                        .Where(e => e.BikeId == bikeId).ToListAsync();

                    if (equipmentToDelete.Count > 0)
                    {
                        _segmentSniperDbContext.Equipment.RemoveRange(equipmentToDelete);
                    }

                    var bikeToDelete = await _segmentSniperDbContext.Bikes
                        .FirstOrDefaultAsync(b => b.BikeId == bikeId && b.UserId == contract.UserId);

                    if (bikeToDelete == null)
                    {
                        return new DeleteResult(false);
                    }

                    _segmentSniperDbContext.Bikes
                            .Remove(bikeToDelete);

                    var numRows = _segmentSniperDbContext.SaveChanges();

                    result.Success = numRows > 0;

                }
            }
            catch (Exception ex)
            {
                return new DeleteResult(false);
            }
            return result;
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

            if (contract.BikeIds.Count <= 0)
            {
                throw new ArgumentException(nameof(contract.BikeIds));
            }
        }
    }
}
