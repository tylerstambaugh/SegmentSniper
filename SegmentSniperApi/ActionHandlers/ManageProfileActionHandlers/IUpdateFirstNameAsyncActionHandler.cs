using SegmentSniper.Models.Models.ManageProfile;
using SegmentSniper.Models.UIModels.ManageProfile;
using System.Runtime.CompilerServices;

namespace SegmentSniper.Api.ActionHandlers.ManageProfileActionHandlers
{
    public interface IUpdateFirstNameAsyncActionHandler
    {
        Task<UpdateFirstNameRequest.Response> HandleAsync(UpdateFirstNameRequest request);
    }

    public class UpdateFirstNameRequest
    {
        public UpdateFirstNameRequest()
        {
            
        }

        public UpdateFirstNameRequest(string firstName)
        {
            FirstName = firstName;
        }
        public UpdateFirstNameRequest(string userId, string firstName)
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