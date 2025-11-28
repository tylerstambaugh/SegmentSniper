using SegmentSniper.Data;

namespace SegmentSniper.Services.StravaTokenServices
{
    public class UpdateStravaTokenForUser : IUpdateStravaTokenForUser
    {
        private readonly ISegmentSniperDbContext _context;
        public UpdateStravaTokenForUser(ISegmentSniperDbContext context)
        {
            _context = context;
        }

        public UpdateStravaTokenContract.Result Execute(UpdateStravaTokenContract contract)
        {
            ValidateContract(contract);

            var userToUpdate = _context.Users.Where(t => t.StravaRefreshToken == contract.StravaToken.RefreshToken).FirstOrDefault();

            userToUpdate.StravaRefreshToken = contract.StravaToken.RefreshToken;
            userToUpdate.StravaTokenExpiresIn = contract.StravaToken.ExpiresIn;
            userToUpdate.StravaTokenExpiresAt = contract.StravaToken.ExpiresAt;
            userToUpdate.UpdatedDate = DateTime.UtcNow;

            _context.Users.Update(userToUpdate);
            bool wasSuccess = _context.SaveChanges() == 1;
            return new UpdateStravaTokenContract.Result(wasSuccess);
        }

        private void ValidateContract(UpdateStravaTokenContract contract)
        {
            if (contract == null)
            {
                throw new ArgumentNullException(nameof(contract));
            }

            if (contract.StravaToken == null)
            {
                throw new ArgumentNullException(nameof(contract.StravaToken));
            }
            if (string.IsNullOrEmpty(contract.StravaToken.RefreshToken))
            {
                throw new ArgumentNullException(nameof(contract.StravaToken.RefreshToken));
            }
            if (contract.StravaToken.ExpiresIn < 0)
            {
                throw new ArgumentException(nameof(contract.StravaToken.ExpiresIn));
            }
            if (contract.StravaToken.ExpiresAt < 0)
            {
                throw new ArgumentException(nameof(contract.StravaToken.ExpiresAt));
            }
        }
    }
}
