//using Microsoft.AspNetCore.Identity;
//using SegmentSniper.Data;
//using SegmentSniper.Data.Entities.Auth;

//namespace SegmentSniper.Services.StravaTokenServices
//{
//    public class AddStravaToken : IAddStravaToken
//    {
//        private readonly ISegmentSniperDbContext _context;
//        private readonly UserManager<ApplicationUser> _userManager;

//        public AddStravaToken(ISegmentSniperDbContext context, UserManager<ApplicationUser> userManager)
//        {
//            _context = context;
//            _userManager = userManager;
//        }

//        public async Task<AddStravaTokenContract.Result> ExecuteAsync(AddStravaTokenContract contract)
//        {
//            ValidateContract(contract);
//            try
//            {
//                var user = await _userManager.FindByIdAsync(contract.UserId);

//                if (user != null && contract.Token.StravaAthlete?.Id != 0)
//                {
//                    user.StravaAthleteId = contract.Token.StravaAthlete?.Id;

//                    var tokenToAdd = new Data.Entities.StravaToken.StravaApiToken
//                    {
//                        UserId = contract.UserId,
//                        ExpiresAt = contract.Token.ExpiresAt,
//                        ExpiresIn = contract.Token.ExpiresIn,
//                        RefreshToken = contract.Token.RefreshToken,
//                    };

//                   _userManager.UpdateAsync(user).Wait();
//                    _context.StravaTokens.Add(tokenToAdd);
//                    _context.SaveChangesAsync();
//                }
//                return new AddStravaTokenContract.Result(true);
//            }
//            catch (Exception ex)
//            {
//                return new AddStravaTokenContract.Result(false);
//            }
//        }

//        private void ValidateContract(AddStravaTokenContract contract)
//        {
//            if (contract == null)
//            {
//                throw new ArgumentNullException(nameof(contract));
//            }

//            if (contract.Token == null)
//            {
//                throw new ArgumentNullException(nameof(contract.Token));
//            }
//            if (_context.StravaTokens.Where(t => t.UserId == contract.UserId).FirstOrDefault() != null)
//            {
//                throw new ApplicationException("Token already exists");
//            }
//            if (_context.Users.Count(u => u.Id == contract.UserId) == 0)
//            {
//                throw new ApplicationException("User does not exist");
//            }
//        }
//    }
//}
