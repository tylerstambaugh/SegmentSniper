using SegmentSniper.Data;
using SegmentSniper.Data.Entities.Equiment;
using Serilog;
using System.Diagnostics.Contracts;

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
            catch (Exception ex)
            {
                Log.Debug($"Error saving regression metrics training data: {ex.Message}");
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
