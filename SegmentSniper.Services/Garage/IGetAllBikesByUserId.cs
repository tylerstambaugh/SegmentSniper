using SegmentSniper.Models.Garage;

namespace SegmentSniper.Services.Garage
{
    public interface IGetAllBikesByUserId
    {
        Task<GetAllBikesByUserIdContract.Result> ExecuteAsync(GetAllBikesByUserIdContract contract);
    }

    public class GetAllBikesByUserIdContract
    {
        public string UserId { get; init; }

        public GetAllBikesByUserIdContract(string userId)
        {
            UserId = userId;
        }
        public class Result
        {
            public Result(List<BikeModel> bikes) => Bikes = bikes;

            public List<BikeModel> Bikes { get; init; }
        }
    }
}