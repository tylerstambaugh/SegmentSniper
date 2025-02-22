using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data;
using SegmentSniper.Models.Models.Garage;

namespace SegmentSniper.Services.Garage.Equipment
{
    public class RetireBikeEquipment : IRetireBikeEquipment
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;
        private readonly IMapper _mapper;

        public RetireBikeEquipment(ISegmentSniperDbContext segmentSniperDbContext, IMapper mapper)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
            _mapper = mapper;
        }

        public async Task<RetireBikeEquipmentContract.Result> ExecuteAsync(RetireBikeEquipmentContract contract)
        {
            ValidateContract(contract);
            var existingEquipment = _segmentSniperDbContext.Equipment.Where(e => e.EquipmentId == contract.EquipmentId).FirstOrDefault();
            if (existingEquipment == null)
            {
                throw new Exception("Equipment not found.");
            }
            existingEquipment.RetiredDate = contract.RetireDate;
            var success = await _segmentSniperDbContext.SaveChangesAsync() == 1;
            if (success)
            {
                var bike = _segmentSniperDbContext.Bikes
                   .Where(b => b.BikeId == contract.BikeId)
                   .Include(b => b.Equipment)
                   .FirstOrDefault();

                var bikeToReturn = _mapper.Map<BikeModel>(bike);

                return new RetireBikeEquipmentContract.Result
                {
                    BikeModel = bikeToReturn
                };
            }
            throw new Exception("Failed to retire equipment.");
        }

        private void ValidateContract(RetireBikeEquipmentContract contract)
        {
            if (contract.Equals(null))
            {
                throw new ArgumentNullException(nameof(contract));
            }
            if (string.IsNullOrEmpty(contract.UserId))
            {
                throw new ArgumentNullException(nameof(contract.UserId));
            }
            if (string.IsNullOrEmpty(contract.BikeId))
            {
                throw new ArgumentNullException(nameof(contract.BikeId));
            }
            if (string.IsNullOrEmpty(contract.EquipmentId))
            {
                throw new ArgumentNullException(nameof(contract.EquipmentId));
            }
        }
    }
}
