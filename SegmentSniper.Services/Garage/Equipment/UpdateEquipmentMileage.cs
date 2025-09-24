using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data;
using SegmentSniper.Services.Interface;

namespace SegmentSniper.Services.Garage.Equipment
{
    public class UpdateEquipmentMileage : IUpdateEquipmentMileage, IExecutableServiceAsync<UpdateEquipmentMileageContract>
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public UpdateEquipmentMileage(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task ExecuteAsync(UpdateEquipmentMileageContract contract)
        {
            ValidateContract(contract);

            var equipment = await _segmentSniperDbContext.Equipment.Where(e => e.EquipmentId == contract.EquipmentId)
                .FirstOrDefaultAsync();

             
        }

        private void ValidateContract(UpdateEquipmentMileageContract contract)
        {
            throw new NotImplementedException();
        }
    }
}
