using SegmentSniper.Services.StravaTokenServices;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaApiToken
{
    public class AddUserActionHandler : IAddUserActionHandler
    {
        private readonly IAddUser _addUser;

        public AddUserActionHandler(IAddUser addUser)
        {
            _addUser = addUser;
        }

        public async Task<AddUserRequest.Response> HandleAsync(AddUserRequest request)
        {
            ValidateRequest(request);
            var result = await _addUser.ExecuteAsync(new AddUserContract(request.UserId, request.StravaAthlete));
            return new AddUserRequest.Response(result.Success, result.Message);
        }

        private void ValidateRequest(AddUserRequest request)
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
