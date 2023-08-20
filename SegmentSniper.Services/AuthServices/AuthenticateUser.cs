using Microsoft.AspNetCore.Identity;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities.Auth;

namespace SegmentSniper.Services.AuthServices
{
    public class AuthenticateUser : IAuthenticateUser
    {
        private readonly ISegmentSniperDbContext _context;
        private readonly UserManager<ApplicationUser> _userMgr;

        public AuthenticateUser(ISegmentSniperDbContext context, UserManager<ApplicationUser> userMgr)
        {
            _context = context;
            _userMgr = userMgr;
        }

        public async Task<AuthenticateUserContract.Result> Execute(AuthenticateUserContract contract)
        {
            ValidateContract();

            var user = await _userMgr.FindByNameAsync(contract.UserLogin.UserName);
            if (user != null && await _userMgr.CheckPasswordAsync(user, contract.UserLogin.Password))
            {
                return new AuthenticateUserContract.Result
                {
                    LoggedInUser = user,
                };
            }
            return null;
        }

        private void ValidateContract()
        {
            throw new NotImplementedException();
        }
    }
}
