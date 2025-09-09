using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data;
using SegmentSniper.Models.Garage;

namespace SegmentSniper.Services.Garage
{
    public class GetAllBikeActivitiesByBikeId : IGetAllBikeActivitiesByBikeId
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public GetAllBikeActivitiesByBikeId(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<GetAllBikeActivitiesByBikeIdContract.Result> ExecuteAsync(GetAllBikeActivitiesByBikeIdContract contract)
        {
            ValidateContract(contract);

            var existingBikeActivities = await _segmentSniperDbContext.BikeActivities
                .Where(b => b.BikeId == contract.BikeId)
                .Select(b => new BikeActivityModel
                {
                    UserId = b.AuthUserId,
                    BikeId = b.BikeId,
                    StravaActivityId = b.StravaActivityId,
                    ActivityDate = b.ActivityDate,
                    DistanceInMeters = b.DistanceInMeters,
                }).ToListAsync();

            return new GetAllBikeActivitiesByBikeIdContract.Result(existingBikeActivities);
        }

        private void ValidateContract(GetAllBikeActivitiesByBikeIdContract contract)
        {
            if (contract is null)
            {
                throw new ArgumentNullException(nameof(contract));
            }
            if (string.IsNullOrEmpty(contract.BikeId))
            {
                throw new ArgumentNullException(nameof(contract.BikeId));
            }
        }
    }
}
