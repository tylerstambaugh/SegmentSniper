using SegmentSniper.Models.Garage;

namespace SegmentSniper.Services.Garage
{
    public interface IGetAllBikeActivitiesByBikeId
    {
        Task<GetAllBikeActivitiesByBikeIdContract.Result> ExecuteAsync(GetAllBikeActivitiesByBikeIdContract contract);
    }

    public class GetAllBikeActivitiesByBikeIdContract
    {
        public GetAllBikeActivitiesByBikeIdContract(string bikeId)
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