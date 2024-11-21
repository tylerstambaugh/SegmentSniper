using SegmentSniper.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

            var tokenToUpdate = _context.StravaTokens.Where(t => t.RefreshToken == contract.StravaToken.RefreshToken).FirstOrDefault();

            tokenToUpdate.RefreshToken = contract.StravaToken.RefreshToken;
            tokenToUpdate.ExpiresIn = contract.StravaToken.ExpiresIn;
            tokenToUpdate.ExpiresAt = contract.StravaToken.ExpiresAt;            

            _context.StravaTokens.Update(tokenToUpdate);
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
