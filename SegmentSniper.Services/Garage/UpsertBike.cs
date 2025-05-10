using SegmentSniper.Data;
using SegmentSniper.Data.Entities.Equiment;
using Serilog;

namespace SegmentSniper.Services.Garage
{
    public class UpsertBike : IUpsertBike
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public UpsertBike(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<AddBikeContract.Result> ExecuteAsync(AddBikeContract contract)
        {
            ValidateContract(contract);

            try
            {
                var existingBike = _segmentSniperDbContext.Bikes.Where(b => b.BikeId == contract.Bike.BikeId).FirstOrDefault();

                if (existingBike == null)
                {
                    var bikeToAdd = new Bike
                    {
                        BikeId = contract.Bike.BikeId ?? Guid.NewGuid().ToString(),
                        UserId = contract.Bike.UserId,
                        IsPrimary = contract.Bike.IsPrimary,                        
                        Name = contract.Bike.Name,
                        Description = contract.Bike.Description,
                        BrandName = contract.Bike.BrandName,
                        ModelName = contract.Bike.ModelName,
                        FrameType = contract.Bike.FrameType.ToString(),
                        MetersLogged = (double)contract.Bike.MetersLogged,
                        DateAdded = DateTime.Now,
                    };

                    _segmentSniperDbContext.Bikes.Add(bikeToAdd);
                    if (await _segmentSniperDbContext.SaveChangesAsync() == 1)
                        return new AddBikeContract.Result
                        { BikeId = bikeToAdd.BikeId };
                    else
                    {
                        return new AddBikeContract.Result { BikeId = string.Empty };
                    }
                }
                else
                {
                    bool isUpdated = false;

                    if (existingBike.Name != contract.Bike.Name)
                    {
                        existingBike.Name = contract.Bike.Name;
                        isUpdated = true;
                    }

                    if (existingBike.IsPrimary != contract.Bike.IsPrimary)
                    {
                        existingBike.IsPrimary = contract.Bike.IsPrimary;
                        isUpdated = true;
                    }

                    if (existingBike.BrandName != contract.Bike.BrandName)
                    {
                        existingBike.BrandName = contract.Bike.BrandName;
                        isUpdated = true;
                    }

                    if (existingBike.BrandName != contract.Bike.BrandName)
                    {
                        existingBike.BrandName = contract.Bike.BrandName;
                        isUpdated = true;
                    }

                    if (existingBike.ModelName != contract.Bike.ModelName)
                    {
                        existingBike.ModelName = contract.Bike.ModelName;
                        isUpdated = true;
                    }

                    if (existingBike.Description != contract.Bike.Description)
                    {
                        existingBike.Description = contract.Bike.Description;
                        isUpdated = true;
                    }


                    if (existingBike.MetersLogged != contract.Bike.MetersLogged)
                    {
                        existingBike.MetersLogged = (double)contract.Bike.MetersLogged;
                        isUpdated = true;
                    }

                    if (isUpdated)
                    {
                        _segmentSniperDbContext.Bikes.Update(existingBike);
                        await _segmentSniperDbContext.SaveChangesAsync();
                    }

                    return new AddBikeContract.Result { BikeId = existingBike.BikeId };
                }

            }
            catch (Exception ex)
            {
                Log.Debug($"Error saving bike data: {ex.Message}");
                throw new ApplicationException("Error adding bike to garage", ex);
            }

        }

        private void ValidateContract(AddBikeContract contract)
        {
            if (contract == null)
            {
                throw new ArgumentNullException(nameof(contract));
            }

            if (contract.Bike == null)
            {
                throw new ArgumentNullException(nameof(contract.Bike));
            }
            if (string.IsNullOrEmpty(contract.Bike.UserId))
            {
                throw new ArgumentNullException(nameof(contract.Bike.UserId));
            }
        }
    }
}
