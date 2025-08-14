using SegmentSniper.Models.ManageProfile;
using SegmentSniper.Models.Models.Auth.User;
using SegmentSniper.Services.Interface;

namespace SegmentSniper.Services.ManageProfile
{
    public interface IUpdateEmailAddressAsync : IExecutableServiceAsync<UpdateEmailAddressAsyncContract, UpdateEmailAddressAsyncContract.Result>
    {
        Task<UpdateEmailAddressAsyncContract.Result> ExecuteAsync(UpdateEmailAddressAsyncContract contract);
    }

    public class UpdateEmailAddressAsyncContract
    {
        public UpdateEmailAddressAsyncContract()
        {
            
        }

        public UpdateEmailAddressAsyncContract(string userId, string updatedEmailAddress)
        {
            UserId = userId;
            UpdatedEmailAddress = updatedEmailAddress;
        }

        public string UserId { get; set; }
        public string UpdatedEmailAddress { get; set; }
        public class Result
        {
            public UserProfile ProfileData { get; set; }
            public UserDto UserDto { get; set; }
        }
    }
}