using SegmentSniper.Services.Common;

namespace SegmentSniper.Services.Garage
{
    public interface IDeleteBike
    {
        Task<DeleteResult> ExecuteAsync(DeleteBikeContract contract);
    }

    public class DeleteBikeContract
    {
        public DeleteBikeContract(string userId, List<string> bikeIds)
        {
            UserId = userId;
            BikeIds = bikeIds;
        }

        public string UserId { get; set; }
        public List<string> BikeIds { get; set; }       
    }
}