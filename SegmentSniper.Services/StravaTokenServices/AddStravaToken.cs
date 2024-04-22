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

        public AddStravaTokenContract.Result Execute(AddStravaTokenContract contract)
        {
            ValidateContract(contract);

            var tokenToAdd = new Data.Entities.StravaToken.StravaApiToken
            {
                UserId = contract.UserId,
                ExpiresAt = contract.Token.ExpiresAt,
                ExpiresIn = contract.Token.ExpiresIn,
                RefreshToken = contract.Token.RefreshToken,
            };

            _context.StravaTokens.Add(tokenToAdd);
            bool wasSuccess = _context.SaveChanges() == 1;
            return new AddStravaTokenContract.Result(wasSuccess);
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
            if (_context.StravaTokens.Where(t => t.UserId == contract.UserId).FirstOrDefault() != null)
            {
                throw new ApplicationException("Token already exists");
            }
            if (_context.Users.Count(u => u.Id == contract.UserId) == 0)
            {
                throw new ApplicationException("User does not exist");
            }
        }
    }
}
