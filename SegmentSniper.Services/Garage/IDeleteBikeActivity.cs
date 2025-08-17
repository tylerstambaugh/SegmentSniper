
namespace SegmentSniper.Services.Garage
{
    public interface IDeleteBikeActivity
    {
        Task<bool> ExecuteAsync(DeleteBikeActivityContract contract);
    }

    public class DeleteBikeActivityContract
    {
        public DeleteBikeActivityContract() { }

        public int UserId { get; set; }
        public string ActivityId { get; set; }
    }
}