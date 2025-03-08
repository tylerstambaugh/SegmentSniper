using SegmentSniper.Models.Models.Garage;

namespace SegmentSniper.Services.Garage
{
    public interface IUpdateGarage
    {
        Task<UpdateGarageContract.Result> ExecuteAsync(UpdateGarageContract contract);
    }

    public class UpdateGarageContract
    {
        public UpdateGarageContract(string userId)
        {
            UserId = userId;
        }

        public string UserId { get; }

        public class Result
        {
            public Result(List<BikeModel> bikes)
            {
                Bikes = bikes;
            }

            public List<BikeModel> Bikes { get; set; }
        }
    }
}