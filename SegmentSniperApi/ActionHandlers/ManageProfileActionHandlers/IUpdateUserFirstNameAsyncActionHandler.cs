using SegmentSniper.Models.Models.ManageProfile;
using SegmentSniper.Models.UIModels.ManageProfile;
using System.Runtime.CompilerServices;

namespace SegmentSniper.Api.ActionHandlers.ManageProfileActionHandlers
{
    public interface IUpdateUserFirstNameAsyncActionHandler
    {
        Task<UpdateUserFirstNameRequest.Response> HandleAsync(UpdateUserFirstNameRequest request);
    }

    public class UpdateUserFirstNameRequest
    {
        public UpdateUserFirstNameRequest()
        {
            
        }

        public UpdateUserFirstNameRequest(string firstName)
        {
            FirstName = firstName;
        }
        public UpdateUserFirstNameRequest(string userId, string firstName)
        {
            UserId = userId;
            FirstName = firstName;
        }

        public string? UserId { get; set; }
        public string FirstName { get; set; }
        public class Response
        {
            public UserProfileUiModel UpdatedUser { get; set; }
        }
    }
}