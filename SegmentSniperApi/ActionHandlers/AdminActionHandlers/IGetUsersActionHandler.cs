using SegmentSniper.Data.Entities.Auth;
using System.Security.Policy;

namespace SegmentSniper.Api.ActionHandlers.AdminActionHandlers
{
    public interface IGetUsersActionHandler
    {
        Task<GetUsersRequest.Response> HandleAsync();
    }

    public class GetUsersRequest
    {
        public class Response
        {
            public List<ApplicationUser> Users { get; set; }
        }
    }
}