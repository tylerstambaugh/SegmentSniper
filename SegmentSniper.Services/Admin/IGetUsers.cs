using SegmentSniper.Data.Entities.Auth;

namespace SegmentSniper.Services.Admin
{
    public interface IGetUsers
    {
        Task<GetUserContract.Result> ExecuteAsync();


    }
    public class GetUserContract
    {
        public class Result
        {
            public List<ApplicationUser> Users { get; set; }
        }
    }
}