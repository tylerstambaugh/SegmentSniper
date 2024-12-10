namespace SegmentSniper.Services.Garage
{
    public interface IAddBikeActivity
    {

        Task <AddBikeActivityContract.Result> ExecuteAsync(AddBikeActivityContract contract);
    }

    public class AddBikeActivityContract
    {
        public required string ActivityId { get; set; }
        public double DistanceInMeters { get; set; }
        public required string BikeId { get; set; }
        public required DateTime ActivityDate { get; set; }

        public  class Result
        {
               public bool Success { get; set; }
        }
    }
}