using SegmentSniper.Models.Models.Garage;

namespace SegmentSniper.Services.Garage
{
    public interface IUpsertBike
    {
       Task <UpsertBikeContract.Result> ExecuteAsync(UpsertBikeContract contrect);
    }

    public class UpsertBikeContract
    {
        public UpsertBikeContract(BikeModel bike)
        {
            Bike = bike;
        }

        public BikeModel Bike { get; set; }
        public class Result
        {
            public BikeModel? Bike { get; set; }
        }
    }
}