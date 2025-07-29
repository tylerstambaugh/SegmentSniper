using SegmentSniper.Services.Common;

namespace SegmentSniper.Services.Garage
{
    public interface IDeleteBike
    {
        Task<DeleteResult> ExecuteAsync(DeleteBikeContract contract);
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
    }
}