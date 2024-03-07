using Microsoft.AspNetCore.Mvc;
using SegmentSniper.Services.Admin;

namespace SegmentSniper.Api.ActionHandlers.ManageProfileActionHandlers
{
    public class DeleteProfileActionHandler : IDeleteProfileActionHandler
    {
        private readonly IRemoveUser _removeUser;

        public DeleteProfileActionHandler(IRemoveUser removeUser)
        {
            _removeUser = removeUser;
        }

        public async Task<DeleteProfileRequest.Response> HandleAsync(DeleteProfileRequest request)
        {
            ValidateRequest(request);
        }

        private void ValidateRequest(DeleteProfileRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            if (string.IsNullOrEmpty(request.UserId))
            {
                throw new ArgumentException("UserId is required");
            }
        }
    }
}
