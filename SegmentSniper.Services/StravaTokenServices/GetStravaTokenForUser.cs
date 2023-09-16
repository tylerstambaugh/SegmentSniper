using SegmentSniper.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegmentSniper.Services.StravaToken
{
    public class GetStravaTokenForUser : IGetStravaTokenForUser
    {
        private readonly ISegmentSniperDbContext _context;

        public GetStravaTokenForUser(ISegmentSniperDbContext context)
        {
            _context = context;
        }

        public GetStravaTokenForUserContract.Result Execute(GetStravaTokenForUserContract contract)
        {
            ValidateContract(contract);

            var stravaToken = _context.StravaToken.Where(x => x.UserId == contract.UserId).FirstOrDefault();

            return new GetStravaTokenForUserContract.Result
            {
                StravaToken = stravaToken
            };
        }

        public void ValidateContract(GetStravaTokenForUserContract contract)
        {
            if (contract == null)
            {
                throw new ArgumentNullException(nameof(contract));
            }
            if(String.IsNullOrWhiteSpace(contract.UserId))
            {
                throw new ArgumentNullException(nameof(contract.UserId));
            }
        }
    }
}
