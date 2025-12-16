using SegmentSniper.Data;

namespace SegmentSniper.Services.Garage
{
    public class DeleteBikeActivity : IDeleteBikeActivity
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public DeleteBikeActivity(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<bool> ExecuteAsync(DeleteBikeActivityContract contract)
        {
          ValidateContrct(contract);
            var bikeActivity = _segmentSniperDbContext.BikeActivities
                .FirstOrDefault(b => b.StravaActivityId == contract.ActivityId);
            if (bikeActivity == null)
            {
                return false; // No activity found to delete
            }
            _segmentSniperDbContext.BikeActivities.Remove(bikeActivity);
            return await _segmentSniperDbContext.SaveChangesAsync() > 0;
        }

        private void ValidateContrct(DeleteBikeActivityContract contract)
        {
            if (string.IsNullOrEmpty(contract.UserId))
            {
                throw new ArgumentException("UserId cannot be null or empty.", nameof(contract.UserId));
            }
            if (string.IsNullOrEmpty(contract.ActivityId))
            {
                throw new ArgumentException("ActivityId must be a string.", nameof(contract.ActivityId));
            }
        }
    }
}
