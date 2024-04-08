using SegmentSniper.Data.Entities.Auth;
using SegmentSniper.Models.Models.ManageProfile;

namespace SegmentSniper.Services.ManageProfile
{
    public interface IUpdateUserFirstNameAsync
    {
        Task<UpdateUserFirstNameContract.Result> ExecuteAsync(UpdateUserFirstNameContract contract);
    }

    public class UpdateUserFirstNameContract
    {
        public UpdateUserFirstNameContract()
        {
            
        }

        public UpdateUserFirstNameContract(string userId, string updatedName)
        {
            UserId = userId;
            UpdatedName = updatedName;
        }

        public string UserId { get; set; }
        public string UpdatedName { get; set; }
        public class Result
        {
            public UserProfile UpdatedUser { get; set; }
        }
    }
}