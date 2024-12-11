using SegmentSniper.Data;
using SegmentSniper.Data.Entities.Equiment;

namespace SegmentSniper.Services.Garage
{
    public class AddBikeActivity : IAddBikeActivity
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public AddBikeActivity(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<AddBikeActivityContract.Result> ExecuteAsync(AddBikeActivityContract contract)
        {
            ValidateContract(contract);

            var existingBikeActivity = _segmentSniperDbContext.BikeActivities.Where(b => b.StravaActivityId == contract.StravaActivityId).FirstOrDefault();

            if(existingBikeActivity != null)
            {
                var existingBike = _segmentSniperDbContext.Bikes.Where(b => b.BikeId == contract.BikeId).FirstOrDefault();
                    if (existingBike != null)
                    {   
                        var bikeActivityToAdd = new BikeActivity
                        {
                            StravaActivityId = contract.StravaActivityId,
                            BikeId = contract.BikeId,
                            DistanceInMeters = contract.DistanceInMeters,
                            ActivityDate = contract.ActivityDate,
                        };
                        _segmentSniperDbContext.BikeActivities.Add(bikeActivityToAdd);
                        var success = await _segmentSniperDbContext.SaveChangesAsync() == 1;

                        return new AddBikeActivityContract.Result
                        {
                            Success = success
                        };
                    }                
            }
            throw new ArgumentException("BikeActivity already exists.");
        }

        private void ValidateContract(AddBikeActivityContract contract)
        {
            if (contract == null)
            {
                throw new ArgumentNullException(nameof(contract));
            }
            if (string.IsNullOrEmpty(contract.BikeId))
            {
                throw new ArgumentNullException(nameof(contract.BikeId));
            }
            if (contract.DistanceInMeters <= 0)
            {
                throw new ArgumentNullException(nameof(contract.DistanceInMeters));
            }
            if (string.IsNullOrEmpty(contract.StravaActivityId))
            {
                throw new ArgumentNullException(nameof(contract.StravaActivityId));
            }
            if (contract.ActivityDate == null)
            {
                throw new ArgumentNullException(nameof(contract.ActivityDate));
            }
            if (contract.ActivityDate > DateTime.UtcNow)
            {
                throw new ArgumentOutOfRangeException(nameof(contract.ActivityDate), "Date must be today or in the past");
            }

        }
    }
}
