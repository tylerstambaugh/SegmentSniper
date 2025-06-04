using SegmentSniper.Services.Admin;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.Admin
{
    public class RemoveUserActionHandler : IRemoveUserActionHandler
    {
        private readonly IRemoveUser _removeUser;

        public RemoveUserActionHandler(IRemoveUser removeUser)
        {
            _removeUser = removeUser;
        }

        public async Task<RemoveUserRequest.Result> HandleAsync(RemoveUserRequest request)
        {
            ValidatedRequest(request);

            try
            {
                var result = await _removeUser.ExecuteAsync(new RemoveUserContract(request.UserId));

                return new RemoveUserRequest.Result
                {
                    Success = result.Success
                };
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        private void ValidatedRequest(RemoveUserRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            if (string.IsNullOrWhiteSpace(request.UserId))
            {
                throw new ArgumentException(nameof(request.UserId));
            }
        }
    }
}
