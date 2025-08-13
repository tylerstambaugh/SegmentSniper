//using Microsoft.AspNetCore.Identity;
//using SegmentSniper.Data;
//using SegmentSniper.Data.Entities.Auth;
//using static SegmentSniper.Services.AuthServices.IGetAuthenticatedUser;

//namespace SegmentSniper.Services.AuthServices
//{
//    public class GetAuthenticatedUser : IGetAuthenticatedUser
//    {
//        private readonly ISegmentSniperDbContext _context;
//        private readonly UserManager<ApplicationUser> _userMgr;

//        public GetAuthenticatedUser(ISegmentSniperDbContext context, UserManager<ApplicationUser> userMgr)
//        {
//            _context = context;
//            _userMgr = userMgr;
//        }

//        public async Task<AuthenticateUserContract.Result> ExecuteAsync(GetAuthenticatedUserContract contract)
//        {
//            ValidateContract(contract);

//            var user = await _userMgr.FindByIdAsync(contract.UserId);
//            if (user != null)
//            {
//                var roles = (List<string>)await _userMgr.GetRolesAsync(user);
//                return new AuthenticateUserContract.Result
//                {
//                    LoggedInUser = user,
//                    Roles = roles,
//                };
//            }
//            else
//            {
//                throw new ApplicationException("Error getting user");
//            }
//        }

//        private void ValidateContract(GetAuthenticatedUserContract contract)
//        {
//            if (contract is null)
//            {
//                throw new ArgumentNullException(nameof(contract));
//            }

//            if (string.IsNullOrWhiteSpace(contract.UserId))
//            {
//                throw new ArgumentException(nameof(contract.UserId));
//            }
//        }
//    }
//}
