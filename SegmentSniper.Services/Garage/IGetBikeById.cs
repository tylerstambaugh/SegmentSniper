using SegmentSniper.Models.Garage;

namespace SegmentSniper.Services.Garage
{
    public interface IGetBikeById
    {
        Task<GetBikeByIdContract.Result> ExecuteAsync(GetBikeByIdContract contract);
    }

    public class GetBikeByIdContract
    {       
        public required string BikeId { get; init; }  
        public class Result(BikeModel? bike)
        {
            public BikeModel? Bike { get; set; } = bike;
        }
    }
}