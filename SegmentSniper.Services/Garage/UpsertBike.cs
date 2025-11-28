using AutoMapper;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities.Garage;
using SegmentSniper.Models.Garage;
using Serilog;

namespace SegmentSniper.Services.Garage
{
    public class UpsertBike : IUpsertBike
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;
        private readonly IMapper _mapper;

        public UpsertBike(ISegmentSniperDbContext segmentSniperDbContext, IMapper mapper)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
            _mapper = mapper;
        }

        public async Task<UpsertBikeContract.Result> ExecuteAsync(UpsertBikeContract contract)
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
                        AuthUserId = contract.Bike.UserId,
                        IsPrimary = contract.Bike.IsPrimary,                        
                        Name = contract.Bike.Name,
                        Description = contract.Bike.Description,
                        BrandName = contract.Bike.BrandName,
                        ModelName = contract.Bike.ModelName,
                        FrameType = contract.Bike.FrameType.ToString(),
                        MetersLogged = (double)contract.Bike.MetersLogged,
                        DateAdded = DateTime.Now, //TODO: update this to be the date it was added in strava if imported
                        ImportedFromStrava = contract.Bike.ImportedFromStrava,
                        CreatedDate = DateTime.Now,
                    };

                    _segmentSniperDbContext.Bikes.Add(bikeToAdd);
                    if (await _segmentSniperDbContext.SaveChangesAsync() == 1)
                    {
                        var bikeModel = _mapper.Map<Bike, BikeModel>(bikeToAdd);
                        return new UpsertBikeContract.Result
                        { Bike = bikeModel };
                    }
                    else
                    {
                        return new UpsertBikeContract.Result { Bike = null };
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
                        existingBike.UpdatedDate = DateTime.Now;
                        _segmentSniperDbContext.Bikes.Update(existingBike);
                        await _segmentSniperDbContext.SaveChangesAsync();
                    }

                    var bikeModel = _mapper.Map<Bike, BikeModel>(existingBike);
                    return new UpsertBikeContract.Result
                    { Bike = bikeModel };
                }

            }
            catch (Exception ex)
            {
                Log.Debug($"Error saving bike data: {ex.Message}");
                throw new ApplicationException("Error adding bike to garage", ex);
            }

        }

        private void ValidateContract(UpsertBikeContract contract)
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
