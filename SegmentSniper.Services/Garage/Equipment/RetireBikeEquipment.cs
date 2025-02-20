using SegmentSniper.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegmentSniper.Services.Garage.Equipment
{
    public class RetireBikeEquipment : IRetireBikeEquipment
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public RetireBikeEquipment(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<RetireBikeEquipmentContract.Result> ExecuteAsync(RetireBikeEquipmentContract contract)
        {
            ValidateContract(contract);
            var existingEquipment = _segmentSniperDbContext.Equipment.Where(e => e.EquipmentId == contract.EquipmentId).FirstOrDefault();
            if (existingEquipment == null)
            {
                throw new Exception("Equipment not found.");
            }
            existingEquipment.RetiredDate = DateTime.Now;
            var success = await _segmentSniperDbContext.SaveChangesAsync() == 1;
            if (success)
            {
                return new RetireBikeEquipmentContract.Result
                {
                    EquipmentId = existingEquipment.EquipmentId
                };
            }
            throw new Exception("Failed to retire equipment.");
        }
    }
}
