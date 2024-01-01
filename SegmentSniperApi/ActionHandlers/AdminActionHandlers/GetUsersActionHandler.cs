using Duende.IdentityServer.Validation;
using SegmentSniper.Services.Admin;

namespace SegmentSniper.Api.ActionHandlers.AdminActionHandlers
{
    public class GetUsersActionHandler : IGetUsersActionHandler
    {
        private readonly IGetUsers _getUsersService;

        public GetUsersActionHandler(IGetUsers getUsersService)
        {
            _getUsersService = getUsersService;
        }

        public async Task<GetUsersRequest.Response> HandleAsync()
        {
            try
            {
                var result = await _getUsersService.ExecuteAsync();

                var users = result.Users;

                return new GetUsersRequest.Response
                    {
                        Users = users
                    };
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
