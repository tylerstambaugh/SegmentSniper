using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data;
using SegmentSniper.Models.Garage;
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
        private readonly IMapper _mapper;

        public DeleteEquipment(ISegmentSniperDbContext segmentSniperDbContext, IMapper mapper)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
            _mapper = mapper;
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
                }

                var updatedBike = await _segmentSniperDbContext.Bikes
                    .Include(b => b.Equipment)
                    .Where(b => b.Equipment.Any(e => e.EquipmentId == contract.EquipmentId))
                    .FirstOrDefaultAsync();

                var bikeModel = _mapper.Map<BikeModel>(updatedBike);

                return new DeleteEquipmentContract.Result
                {
                    Bike = bikeModel
                };
            }
            catch (Exception ex)
            {
                throw;
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
