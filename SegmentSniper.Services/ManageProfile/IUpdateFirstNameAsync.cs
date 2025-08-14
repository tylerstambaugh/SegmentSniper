using SegmentSniper.Data.Entities.Auth;
using SegmentSniper.Models.ManageProfile;

namespace SegmentSniper.Services.ManageProfile
{
    public interface IUpdateFirstNameAsync
    {
        Task<UpdateFirstNameContract.Result> ExecuteAsync(UpdateFirstNameContract contract);
    }

    public class UpdateFirstNameContract
    {
        public UpdateFirstNameContract()
        {
            
        }

        public UpdateFirstNameContract(string userId, string updatedName)
        {
            UserId = userId;
            UpdatedName = updatedName;
        }

        public string UserId { get; set; }
        public string UpdatedName { get; set; }
        public class Result
        {
            public UserProfile ProfileData { get; set; }
        }
    }
}