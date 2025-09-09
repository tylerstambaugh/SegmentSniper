using SegmentSniper.Models.Garage;

namespace SegmentSniper.Services.Garage
{
    public interface IGetAllBikeActivitiesByUserId
    {
        Task<GetAllBikeActivitiesByUserIdContract.Result> ExecuteAsync(GetAllBikeActivitiesByUserIdContract contract);
    }

    public class GetAllBikeActivitiesByUserIdContract
    {
        public GetAllBikeActivitiesByUserIdContract(string userId)
        {
            UserId = userId;
        }

        public string UserId { get; init; }
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