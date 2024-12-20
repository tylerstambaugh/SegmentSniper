using SegmentSniper.Data;
using SegmentSniper.Data.Entities.Equiment;
using SegmentSniper.Models.Models.Garage;

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
            ValidateContract(contract.BikeActivity);
            var bikeActivity = contract.BikeActivity;
            var existingBikeActivity = _segmentSniperDbContext.BikeActivities.Where(b => b.StravaActivityId == bikeActivity.StravaActivityId).FirstOrDefault();

            if(existingBikeActivity == null)
            {
                var existingBike = _segmentSniperDbContext.Bikes.Where(b => b.BikeId == bikeActivity.BikeId).FirstOrDefault();
                    if (existingBike != null)
                    {   
                        var bikeActivityToAdd = new BikeActivity
                        {
                            UserId = bikeActivity.UserId,
                            StravaActivityId = bikeActivity.StravaActivityId,
                            BikeId = bikeActivity.BikeId,
                            DistanceInMeters = bikeActivity.DistanceInMeters,
                            ActivityDate = bikeActivity.ActivityDate,
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

        private void ValidateContract(BikeActivityModel bikeActivity)
        {
            if (bikeActivity == null)
            {
                throw new ArgumentNullException(nameof(bikeActivity));
            }
            if (string.IsNullOrEmpty(bikeActivity.BikeId))
            {
                throw new ArgumentNullException(nameof(bikeActivity.BikeId));
            }
            if (bikeActivity.DistanceInMeters <= 0)
            {
                throw new ArgumentNullException(nameof(bikeActivity.DistanceInMeters));
            }
            if (string.IsNullOrEmpty(bikeActivity.StravaActivityId))
            {
                throw new ArgumentNullException(nameof(bikeActivity.StravaActivityId));
            }
            if (bikeActivity.ActivityDate == null)
            {
                throw new ArgumentNullException(nameof(bikeActivity.ActivityDate));
            }
            if (bikeActivity.ActivityDate > DateTime.UtcNow)
            {
                throw new ArgumentOutOfRangeException(nameof(bikeActivity.ActivityDate), "Date must be today or in the past");
            }

        }
    }
}
