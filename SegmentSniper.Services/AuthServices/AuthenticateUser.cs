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

        public async Task<AuthenticateUserContract.Result> ExecuteAsync(AuthenticateUserContract contract)
        {
            ValidateContract(contract);

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

        private void ValidateContract(AuthenticateUserContract contract)
        {
           if(contract is null)
            {
                throw new ArgumentNullException(nameof(contract));
            }
           if(contract.UserLogin == null)
            {
                throw new ArgumentNullException(nameof(contract.UserLogin));
            }

           if(string.IsNullOrWhiteSpace(contract.UserLogin.UserName))
            {
                throw new ArgumentNullException(nameof(contract.UserLogin.UserName));
            }

           if(string.IsNullOrWhiteSpace(contract.UserLogin.Password))
            {
                throw new ArgumentNullException(nameof(contract.UserLogin.Password));
            }
        }
    }
}
