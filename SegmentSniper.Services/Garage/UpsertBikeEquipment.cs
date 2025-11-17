using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data;
using EquipmentEntity = SegmentSniper.Data.Entities.Garage;
using SegmentSniper.Models.Garage;

namespace SegmentSniper.Services.Garage
{
    public class UpsertBikeEquipment : IUpsertBikeEquipment
    {
        private readonly ISegmentSniperDbContext _context;
        private readonly IMapper _mapper;

        public UpsertBikeEquipment(ISegmentSniperDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<UpsertBikeEquipmentContract.Result> ExecuteAsync(UpsertBikeEquipmentContract contract)
        {
            ValidateContract(contract);

           var existingEquipment = _context.Equipment.Where(e => e.EquipmentId == contract.Equipment.EquipmentId).FirstOrDefault();

            if (existingEquipment == null)
            {
                var equipmentToAdd = new EquipmentEntity.Equipment
                {
                    EquipmentId = Guid.NewGuid().ToString(),
                    AuthUserId = contract.UserId,
                    BikeId = contract.BikeId,
                    Name = contract.Equipment.Name,
                    Description = contract.Equipment.Description,
                    TotalMilage = contract.Equipment.TotalMiles,
                    InstallDate = contract.Equipment.InstallDate,
                    UpdatedDate = contract.Equipment.UpdatedDate ?? DateTime.Now,
                    RetiredDate = contract.Equipment.RetiredDate,
                    ReminderDate = contract.Equipment.ReminderDate,
                    ReminderDuration = contract.Equipment.ReminderDuration,
                    Price = contract.Equipment.Price,
                    ReplaceAtMiles = contract.Equipment.ReplaceAtMiles,
                    MilesUntilReplaceReminder = contract.Equipment.MilesUntilReplaceReminder,
                    MaxRemindersToSend = contract.Equipment.MaxRemindersToSend,
                    RemindersSent = contract.Equipment.RemindersSent
                };

                if(contract.Equipment.InstallDate != null)
                {
                    equipmentToAdd.InstallDate = contract.Equipment.InstallDate;
                }

                if (contract.Equipment.ReminderDate != null)
                {
                    equipmentToAdd.ReminderDate = contract.Equipment.ReminderDate;
                }

                if (contract.Equipment.RetiredDate != null)
                {
                    equipmentToAdd.RetiredDate = contract.Equipment.RetiredDate;
                }

                _context.Equipment.Add(equipmentToAdd);
                var success = await _context.SaveChangesAsync() == 1;

                if (success)
                {
                    var bike = _context.Bikes
                        .Where(b => b.BikeId == contract.BikeId)
                        .Include(b => b.Equipment)
                        .FirstOrDefault();

                    var bikeToReturn = _mapper.Map<BikeModel>(bike);

                    return new UpsertBikeEquipmentContract.Result
                    {
                        BikeModel = bikeToReturn
                    };
                }

                throw new Exception($"Problem updateing equipment on bike ID: {contract.BikeId}");
            }
            else
            {
                bool isUpdated = false;

                if (existingEquipment.Name != contract.Equipment.Name)
                {
                    existingEquipment.Name = contract.Equipment.Name;
                    isUpdated = true;
                }
                if (existingEquipment.Description != contract.Equipment.Description)
                {
                    existingEquipment.Description = contract.Equipment.Description;
                    isUpdated = true;
                }
                if (existingEquipment.TotalMilage != contract.Equipment.TotalMiles)
                {
                    existingEquipment.TotalMilage = contract.Equipment.TotalMiles;
                    isUpdated = true;
                }
                if (existingEquipment.InstallDate != contract.Equipment.InstallDate)
                {
                    existingEquipment.InstallDate = contract.Equipment.InstallDate;
                    isUpdated = true;
                }
                if (existingEquipment.UpdatedDate != contract.Equipment.UpdatedDate)
                {
                    existingEquipment.UpdatedDate = contract.Equipment.UpdatedDate;
                    isUpdated = true;
                }                
                if (existingEquipment.RetiredDate != contract.Equipment.RetiredDate)
                {
                    existingEquipment.RetiredDate = contract.Equipment.RetiredDate;
                    isUpdated = true;
                }
                if (existingEquipment.ReminderDate != contract.Equipment.ReminderDate)
                {
                    existingEquipment.ReminderDate = contract.Equipment.ReminderDate;
                    isUpdated = true;
                }
                if (existingEquipment.ReminderDuration != contract.Equipment.ReminderDuration)
                {
                    existingEquipment.ReminderDuration = contract.Equipment.ReminderDuration;
                    isUpdated = true;
                }
                if (existingEquipment.Price != contract.Equipment.Price)
                {
                    existingEquipment.Price = contract.Equipment.Price;
                    isUpdated = true;
                }
                if (existingEquipment.ReplaceAtMiles != contract.Equipment.ReplaceAtMiles)
                {
                    existingEquipment.ReplaceAtMiles = contract.Equipment.ReplaceAtMiles;
                    isUpdated = true;
                }
                if (existingEquipment.MilesUntilReplaceReminder != contract.Equipment.MilesUntilReplaceReminder)
                {
                    existingEquipment.MilesUntilReplaceReminder = contract.Equipment.MilesUntilReplaceReminder;
                    isUpdated = true;
                }
                if(existingEquipment.MaxRemindersToSend != contract.Equipment.MaxRemindersToSend)
                {
                    existingEquipment.MaxRemindersToSend = contract.Equipment.MaxRemindersToSend;
                    isUpdated = true;
                }
                if(existingEquipment.RemindersSent != contract.Equipment.RemindersSent)
                {
                    existingEquipment.RemindersSent = contract.Equipment.RemindersSent;
                    isUpdated = true;
                }

                if (isUpdated)
                {
                    var success = await _context.SaveChangesAsync() > 0;

                    if (success)
                    {
                        var bike = _context.Bikes
                            .Where(b => b.BikeId == contract.BikeId)
                            .Include(b => b.Equipment)
                            .FirstOrDefault();

                        var bikeToReturn = _mapper.Map<BikeModel>(bike);

                        return new UpsertBikeEquipmentContract.Result
                        {
                            BikeModel = bikeToReturn
                        };
                    }

                    throw new Exception($"Problem updating equipment on bike ID: {contract.BikeId}");
                }

                return new UpsertBikeEquipmentContract.Result
                {
                    BikeModel = _mapper.Map<BikeModel>(_context.Bikes
                        .Where(b => b.BikeId == contract.BikeId)
                        .Include(b => b.Equipment)
                        .FirstOrDefault())
                };
            }

        }

        private void ValidateContract(UpsertBikeEquipmentContract contract)
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
