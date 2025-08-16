using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data;
using SegmentSniper.Models.Garage;

namespace SegmentSniper.Services.Garage
{
    public class GetAllBikeActivitiesByUserId : IGetAllBikeActivitiesByUserId
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public GetAllBikeActivitiesByUserId(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<GetAllBikeActivitiesByUserIdContract.Result> ExecuteAsync(GetAllBikeActivitiesByUserIdContract contract)
        {
            ValidateContract(contract);

            var existingBikeActivities = await _segmentSniperDbContext.BikeActivities
                .Where(b => b.AuthUserId == contract.UserId)
                .Select(ba => new BikeActivityModel
                {
                    UserId = ba.AuthUserId,
                    BikeId = ba.BikeId,
                    StravaActivityId = ba.StravaActivityId,
                    ActivityDate = ba.ActivityDate,
                    DistanceInMeters = ba.DistanceInMeters,
                })
                .ToListAsync();

            return new GetAllBikeActivitiesByUserIdContract.Result(existingBikeActivities);
        }

        private void ValidateContract(GetAllBikeActivitiesByUserIdContract contract)
        {
            if (contract is null)
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
