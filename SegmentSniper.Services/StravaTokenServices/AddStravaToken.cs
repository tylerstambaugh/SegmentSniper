using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data;

namespace SegmentSniper.Services.StravaTokenServices
{
    public class AddStravaToken : IAddStravaToken
    {
        private readonly ISegmentSniperDbContext _context;


        public AddStravaToken(ISegmentSniperDbContext context)
        {
            _context = context;
        }

        public async Task<AddStravaTokenContract.Result> ExecuteAsync(AddStravaTokenContract contract)
        {
            ValidateContract(contract);
            try
            {
                var stravaAtheleteIdExists = _context.Users.Where(u => u.StravaAthleteId == contract.Token.StravaAthlete.Id).ToList();

                if (stravaAtheleteIdExists.Any())
                {
                    throw new ApplicationException("StravaAthleteId already exists for a user. Please log in as existing user, or contact support.");
                }
                var user = await _context.Users.Where(a => a.AuthUserId == contract.AuthUserId).FirstOrDefaultAsync();

                if (user != null && contract.Token.StravaAthlete?.Id != 0)
                {
                    user.StravaAthleteId = (long)(contract.Token.StravaAthlete?.Id);
                    user.StravaRefreshToken = contract.Token.RefreshToken;
                    user.StravaTokenExpiresAt = contract.Token.ExpiresAt;
                    user.StravaTokenExpiresIn = contract.Token.ExpiresIn;
                    user.UpdatedDate = DateTime.UtcNow;

                    _context.Users.Update(user);
                    await _context.SaveChangesAsync();
                }
                return new AddStravaTokenContract.Result(true);
            }
            catch (Exception ex)
            {
                return new AddStravaTokenContract.Result(false);
            }
        }

        private void ValidateContract(AddStravaTokenContract contract)
        {
            if (contract == null)
            {
                throw new ArgumentNullException(nameof(contract));
            }

            if (contract.Token == null)
            {
                throw new ArgumentNullException(nameof(contract.Token));
            }
   
            if (_context.Users.Count(u => u.AuthUserId == contract.AuthUserId) == 0)
            {
                throw new ApplicationException("User does not exist");
            }
        }
    }
}
