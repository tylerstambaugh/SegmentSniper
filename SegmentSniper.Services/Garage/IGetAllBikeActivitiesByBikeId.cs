using SegmentSniper.Models.Models.Garage;

namespace SegmentSniper.Services.Garage
{
    public interface IGetAllBikeActivitiesByBikeId
    {
        GetAllBikeActivitiesByUserIdContract.Result Execute(GetAllBikeActivitiesByUserIdContract contract);
    }

    public class GetAllBikeActivitiesByUserIdContract
    {
        public GetAllBikeActivitiesByUserIdContract(string bikeId)
        {
            BikeId = bikeId;
        }

        public string BikeId { get; init; }
        public class Result
        {
            public Result(List<BikeActivityModel> bikeActivities)
            {
                BikeActivities = bikeActivities;
            }

            public List<BikeActivityModel> BikeActivities { get; init; }
        }
    }
}