using SegmentSniper.Services.User;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.User
{
    public class DeleteAppUserActionHandler: IDeleteAppUserActionHandler
    {
        private readonly IDeleteAppUser _deleteAppUser;

        public DeleteAppUserActionHandler(IDeleteAppUser deleteAppUser)
        {
            _deleteAppUser = deleteAppUser;
        }

        public async Task<DeleteAppUserRequest.Response> HandleAsync(DeleteAppUserRequest request)
        {
            ValidateRequest(request);

            var result = await _deleteAppUser.ExecuteAsync(new DeleteAppUserContract(request.UserId));
            return new DeleteAppUserRequest.Response(result.Success, result.Message);
        }

        private void ValidateRequest(DeleteAppUserRequest request)
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
