using SegmentSniper.Models.ManageProfile;

namespace SegmentSniper.Services.ManageProfile
{
    public interface IGetProfile
    {
        Task<GetProfileContract.Result> ExecuteAsync(GetProfileContract contract);
    }

    public class GetProfileContract
    {
        public GetProfileContract(string userId)
        {
            UserId = userId;
        }

        public string UserId { get; set; }

        public class Result
        {
            public UserProfile Profile { get; set; }
        }
    }
}