using SegmentSniper.Services.User;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.User
{
    public class GetAppUserByAuthUSerIdActionHandler : IGetAppUserByAuthUSerIdActionHandler
    {
        private readonly IGetAppUserByAuthId _getAppUserByAuthId;

        public GetAppUserByAuthUSerIdActionHandler(IGetAppUserByAuthId getAppUserByAuthId)
        {
            _getAppUserByAuthId = getAppUserByAuthId;
        }

        public async Task<GetAppUserByAuthIdRequest.Response> HandleAsync(GetAppUserByAuthIdRequest request)
        {
            ValidateRequest(request);
            var result = await _getAppUserByAuthId.ExecuteAsync(new GetAppUserByAuthIdContract(request.AuthUserId));
            return new GetAppUserByAuthIdRequest.Response(result.AppUser);
        }
        private void ValidateRequest(GetAppUserByAuthIdRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request), "Request cannot be null.");
            }
            if (string.IsNullOrWhiteSpace(request.AuthUserId))
            {
                throw new ArgumentException("AuthUserId cannot be null or empty.", nameof(request.AuthUserId));
            }
        }
    }
}
