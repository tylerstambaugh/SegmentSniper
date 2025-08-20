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
                var stravaAthleteInfo = await _context.StravaAthleteInfo.Where(a => a.AuthUserId == contract.AuthUserId).FirstOrDefaultAsync();

                if (stravaAthleteInfo != null && contract.Token.StravaAthlete?.Id != 0)
                {
                    stravaAthleteInfo.StravaAthleteId = (long)(contract.Token.StravaAthlete?.Id);

                    var tokenToAdd = new Data.Entities.StravaToken.User
                    {                        
                        StravaTokenExpiresAt = contract.Token.ExpiresAt,
                        StravaTokenExpiresIn = contract.Token.ExpiresIn,
                        StravaRefreshToken = contract.Token.RefreshToken,
                    };

                    _context.StravaAthleteInfo.Add(tokenToAdd);
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
            if (_context.StravaAthleteInfo.Where(t => t.AuthUserId == contract.AuthUserId).FirstOrDefault() != null)
            {
                throw new ApplicationException("Token already exists");
            }
            if (_context.StravaAthleteInfo.Count(u => u.AuthUserId == contract.AuthUserId) == 0)
            {
                throw new ApplicationException("User does not exist");
            }
        }
    }
}
