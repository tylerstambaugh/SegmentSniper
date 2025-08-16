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
                var user = await _context.StravaAthleteInfo.Where(predicate => predicate.AuthUserId == contract.UserId).FirstOrDefaultAsync();

                if (user != null && contract.Token.StravaAthlete?.Id != 0)
                {
                    user.StravaAthleteId = contract.Token.StravaAthlete?.Id.ToString();

                    var tokenToAdd = new Data.Entities.StravaToken.StravaAthleteInfo
                    {
                        AuthUserId = contract.UserId,
                        ExpiresAt = contract.Token.ExpiresAt,
                        ExpiresIn = contract.Token.ExpiresIn,
                        RefreshToken = contract.Token.RefreshToken,
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
            if (_context.StravaAthleteInfo.Where(t => t.AuthUserId == contract.UserId).FirstOrDefault() != null)
            {
                throw new ApplicationException("Token already exists");
            }
            if (_context.StravaAthleteInfo.Count(u => u.AuthUserId == contract.UserId) == 0)
            {
                throw new ApplicationException("User does not exist");
            }
        }
    }
}
