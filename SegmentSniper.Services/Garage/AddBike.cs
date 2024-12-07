using SegmentSniper.Data;
using SegmentSniper.Data.Entities.Equiment;
using Serilog;

namespace SegmentSniper.Services.Garage
{
    public class AddBike : IAddBike
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public AddBike(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public AddBikeContract.Result Execute(AddBikeContract contract)
        {
            ValidateContract(contract);

            try
            {
                var existingBike = _segmentSniperDbContext.Bikes.Where(b => b.BikeId == contract.Bike.BikeId).FirstOrDefault();

                if (existingBike != null)
                {
                    var bikeToAdd = new Bike
                    {
                        BikeId = contract.Bike.BikeId ?? Guid.NewGuid().ToString(),
                        IsPrimary = contract.Bike.IsPrimary,
                        Name = contract.Bike.Name,
                        Description = contract.Bike.Description,
                        BrandName = contract.Bike.BrandName,
                        ModelName = contract.Bike.ModelName,
                        FrameType = contract.Bike.FrameType.ToString(),
                        DistanceLogged = (decimal)contract.Bike.DistanceLogged,
                        DateAdded = DateTime.Now,
                    };

                    _segmentSniperDbContext.Bikes.Add(bikeToAdd);
                    if (_segmentSniperDbContext.SaveChanges() == 1)
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


                    if (existingBike.DistanceLogged != contract.Bike.DistanceLogged)
                    {
                        existingBike.DistanceLogged = (decimal)contract.Bike.DistanceLogged;
                        isUpdated = true;
                    }

                    if (isUpdated)
                    {
                        _segmentSniperDbContext.Bikes.Update(existingBike);
                        _segmentSniperDbContext.SaveChanges(); // Persist changes to the database
                    }

                    return new AddBikeContract.Result { BikeId = existingBike.BikeId };
                }

            }
            catch (Exception ex)
            {
                Log.Debug($"Error savingbike data data: {ex.Message}");
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

            if (_segmentSniperDbContext.Bikes.Where(b => b.BikeId == contract.Bike.BikeId).Any())
            {
                throw new ApplicationException("Bikes already exists in users garage");
            }
        }
    }
}
