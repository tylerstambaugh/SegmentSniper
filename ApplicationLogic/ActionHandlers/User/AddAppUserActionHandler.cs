using SegmentSniper.Services.StravaTokenServices;

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
            var result = await _addUser.ExecuteAsync(new AddAppUserContract(request.UserId, request.StravaAthlete));
            return new AddAppUserRequest.Response(result.Success, result.Message);
        }

        private void ValidateRequest(AddAppUserRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request), "Request cannot be null.");
            }

            if (string.IsNullOrWhiteSpace(request.UserId))
            {
                throw new ArgumentException("UserId cannot be null or empty.", nameof(request.UserId));
            }
        }

    }
}
