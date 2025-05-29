using SegmentSniper.Data;
using SegmentSniper.Services.ManageProfile;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegmentSniper.Services.Garage.Equipment
{
    public class DeleteEquipment : IDeleteEquipment
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public DeleteEquipment(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<DeleteEquipmentContract.Result> ExecuteAsync(DeleteEquipmentContract contract)
        {
           ValidateContract(contract);

            try
            {
                var equipmentToDelete = _segmentSniperDbContext.Equipment
                    .Where(e => e.EquipmentId == contract.EquipmentId && e.UserId == contract.UserId)
                    .FirstOrDefault();

                if (equipmentToDelete != null)
                {
                    _segmentSniperDbContext.Equipment
                        .Remove(equipmentToDelete);

                    var numRows = _segmentSniperDbContext.SaveChanges();

                    return new DeleteEquipmentContract.Result { Success = numRows == 1 };
                }
                return new DeleteEquipmentContract.Result { Success = false };
            }
            catch (Exception ex)
            {
               return new DeleteEquipmentContract.Result { Success = false };
            }
        }

        private void ValidateContract(DeleteEquipmentContract contract)
        {
            if(contract == null)
            {
                throw new ArgumentNullException(nameof(contract));
            }

            if(string.IsNullOrEmpty(contract.UserId))
            {
                throw new ArgumentException(nameof(contract.UserId));
            }

            if(string.IsNullOrEmpty(contract.EquipmentId))
            {
                throw new ArgumentException(nameof(contract.EquipmentId));
            }
        }
    }
}
