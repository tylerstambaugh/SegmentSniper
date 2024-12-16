using SegmentSniper.Data;
using SegmentSniper.Data.Entities.Equiment;
using SegmentSniper.Models.Models.Garage;

namespace SegmentSniper.Services.Garage
{
    public class GetAllBikeActivitiesByBikeId : IGetAllBikeActivitiesByBikeId
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public GetAllBikeActivitiesByBikeId(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public GetAllBikeActivitiesByUserIdContract.Result Execute(GetAllBikeActivitiesByUserIdContract contract)
        {
            ValidateContract(contract);

            var existingBikeActivities = _segmentSniperDbContext.BikeActivities.Where(b => b.BikeId == contract.BikeId);
            List<BikeActivityModel> returnModels = new List<BikeActivityModel>();

            foreach (BikeActivity bikeActivity in existingBikeActivities)
            {
                returnModels.Add(new BikeActivityModel
                {
                    BikeId = bikeActivity.BikeId,
                    StravaActivityId = bikeActivity.StravaActivityId,
                    ActivityDate = bikeActivity.ActivityDate,
                    DistanceInMeters = bikeActivity.DistanceInMeters,
                });
            }

            return new GetAllBikeActivitiesByUserIdContract.Result(returnModels);
        }

        private void ValidateContract(GetAllBikeActivitiesByUserIdContract contract)
        {
           if(contract is null)
            {
                throw new ArgumentNullException(nameof(contract));
            }
           if(string.IsNullOrEmpty(contract.BikeId))
            {
                throw new ArgumentNullException(nameof (contract.BikeId));
            }
        }
    }
}
