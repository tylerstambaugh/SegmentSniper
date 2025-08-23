using SegmentSniper.Models.User;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.User
{
    public interface IGetAppUserByAuthUSerIdActionHandler
    {
        Task<GetAppUserByAuthIdRequest.Response> HandleAsync(GetAppUserByAuthIdRequest request);
    }

    public class GetAppUserByAuthIdRequest
    {
        public GetAppUserByAuthIdRequest(string authUserId)
        {
            AuthUserId = authUserId;
        }

        public string AuthUserId { get; }
        public class Response
        {
            public AppUserModel? AppUserModel { get; }
            public Response()
            {
                AppUserModel = null;
            }
            public Response(AppUserModel appUser)
            {
                AppUserModel = appUser;
            }
        }
    }
}