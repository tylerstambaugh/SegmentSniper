using SegmentSniper.Services.User;
using Serilog;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.User
{
    public class AddAppUserActionHandler : IAddAppUserActionHandler
    {
        private readonly IAddAppUser _addUser;

        public AddAppUserActionHandler(IAddAppUser addUser)
        {
            _addUser = addUser;
        }

        public async Task<AddAppUserRequest.Response> HandleAsync(AddAppUserRequest request)
        {
            ValidateRequest(request);
            Log.Debug($"calling add user service from handler");
            var result = await _addUser.ExecuteAsync(new AddAppUserContract(request.UserId, request.EmailAddress));
            return new AddAppUserRequest.Response(result.Success, result.Message);
        }

        private void ValidateRequest(AddAppUserRequest request)
        {
            if (request == null)
            {
                Log.Debug($"add user request is null");
                throw new ArgumentNullException(nameof(request), "Request cannot be null.");
            }

            if (string.IsNullOrWhiteSpace(request.UserId))
            {
                Log.Debug($"add user request.userId is null");
                throw new ArgumentException("UserId cannot be null or empty.", nameof(request.UserId));
            }
        }

    }
}
