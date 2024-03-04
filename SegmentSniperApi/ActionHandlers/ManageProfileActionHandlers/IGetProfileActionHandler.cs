using Microsoft.AspNetCore.Mvc;
using SegmentSniper.Models.UIModels.ManageProfile;

namespace SegmentSniper.Api.ActionHandlers.ManageProfileActionHandlers
{
    public interface IGetProfileActionHandler
    {
        Task<GetProfileRequest.Response> HandleAsync(GetProfileRequest request);
    }

    public class GetProfileRequest
    {
        public required string UserId { get; set; }

        public class Response
        {
            public UserProfileUiModel? UserProfile { get; set; }
        }
    }

   
}