using SegmentSniper.Data.Entities.Auth;
using System.Security.Claims;

namespace SegmentSniper.Services.AuthServices
{
    public interface IGetUserRoles
    {
        Task<GetUserRolesContract.Result> Execute(GetUserRolesContract contract);
    }

    public class GetUserRolesContract
    {
        public GetUserRolesContract(ApplicationUser user)
        {
            User = user;
        }
        public ApplicationUser User { get; set; }
        public class Result
        {
            public List<Claim> Roles { get; set; }
        }
    }
}