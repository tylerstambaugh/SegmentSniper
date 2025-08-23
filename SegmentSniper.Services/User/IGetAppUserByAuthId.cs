using SegmentSniper.Data.Entities.User;

namespace SegmentSniper.Services.User
{
    public interface IGetAppUserByAuthId
    {
        Task<GetAppUserByAuthIdContract.Result> ExecuteAsync(GetAppUserByAuthIdContract contract);
    }

    public class GetAppUserByAuthIdContract
    {
        public GetAppUserByAuthIdContract(string authUserId)
        {
            AuthUserId = authUserId;
        }
        public string AuthUserId { get; }
        public class Result
        {
            public AppUser? AppUser { get; }
            public Result()
            {
                
            }

            public Result(AppUser user)
            {
                AppUser = user;
            }
        }
            
    }
}