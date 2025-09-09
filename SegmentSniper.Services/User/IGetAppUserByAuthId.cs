using SegmentSniper.Data.Entities.User;
using SegmentSniper.Models.User;

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
            public AppUserModel? AppUser { get; }
            public Result()
            {
                
            }

            public Result(AppUserModel user)
            {
                AppUser = user;
            }
        }
            
    }
}