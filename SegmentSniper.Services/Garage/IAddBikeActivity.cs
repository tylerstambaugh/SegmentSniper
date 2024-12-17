using SegmentSniper.Models.Models.Garage;

namespace SegmentSniper.Services.Garage
{
    public interface IAddBikeActivity
    {

        Task <AddBikeActivityContract.Result> ExecuteAsync(AddBikeActivityContract contract);
    }

    public class AddBikeActivityContract
    {
        public AddBikeActivityContract(BikeActivityModel bikeActivity)
        {
            BikeActivity = bikeActivity;
        }

        public BikeActivityModel BikeActivity { get; set; }

        public  class Result
        {
               public bool Success { get; set; }
        }
    }
}