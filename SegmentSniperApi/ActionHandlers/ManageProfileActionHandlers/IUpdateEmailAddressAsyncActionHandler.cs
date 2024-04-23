using SegmentSniper.Models.Models.Auth.User;
using SegmentSniper.Models.UIModels.ManageProfile;

namespace SegmentSniper.Api.ActionHandlers.ManageProfileActionHandlers
{
    public interface IUpdateEmailAddressAsyncActionHandler
    {
        Task <UpdateEmailAddressAsyncRequest.Response> HandleAsync(UpdateEmailAddressAsyncRequest request);
    }

    public class UpdateEmailAddressAsyncRequest
    {

        public UpdateEmailAddressAsyncRequest(string? userId, string emailAddress, int verificationCode )
        {
            UserId = userId;
            EmailAddress = emailAddress;
            VerificationCode = verificationCode;
        }

        public string? UserId { get; set; }
        public string EmailAddress { get;  }
        public int VerificationCode { get;  }   
        public class Response
        {
            public UserProfileUiModel ProfileData { get; set; }
            public UserDto UserDto { get; set; }
        }
    }
}