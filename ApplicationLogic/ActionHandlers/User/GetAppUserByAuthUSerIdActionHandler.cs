using AutoMapper;
using SegmentSniper.Models.User;
using SegmentSniper.Services.User;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.User
{
    public class GetAppUserByAuthUSerIdActionHandler : IGetAppUserByAuthUSerIdActionHandler
    {
        private readonly IGetAppUserByAuthId _getAppUserByAuthId;
        private readonly IMapper _mapper;

        public GetAppUserByAuthUSerIdActionHandler(IGetAppUserByAuthId getAppUserByAuthId, IMapper mapper)
        {
            _getAppUserByAuthId = getAppUserByAuthId;
            _mapper = mapper;
        }

        public async Task<GetAppUserByAuthIdRequest.Response> HandleAsync(GetAppUserByAuthIdRequest request)
        {
            ValidateRequest(request);
            var result = await _getAppUserByAuthId.ExecuteAsync(new GetAppUserByAuthIdContract(request.AuthUserId));

            var returnModel = result.AppUser != null ? _mapper.Map<AppUserModel>(result.AppUser) : null;
            return new GetAppUserByAuthIdRequest.Response(returnModel);
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
