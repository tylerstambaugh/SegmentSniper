namespace SegmentSniper.Services.Garage
{
    public interface IDeleteBike
    {
        Task<DeleteBikeContract.Result> ExecuteAsync(DeleteBikeContract contract);
    }

    public class DeleteBikeContract
    {
        public DeleteBikeContract(string userId, string bikeId)
        {
            UserId = userId;
            BikeId = bikeId;
        }

        public string UserId { get; set; }
        public string BikeId { get; set; }
        public class Result
        {
            public bool Success { get; set; }
        }
    }
}