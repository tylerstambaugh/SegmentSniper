using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data;
using SegmentSniper.Models.Strava.Token;

namespace SegmentSniper.Services.StravaToken
{
    public class GetStravaTokenForUser : IGetStravaTokenForUser
    {
        private readonly ISegmentSniperDbContext _context;
        private readonly IMapper _mapper;

        public GetStravaTokenForUser(ISegmentSniperDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<GetStravaTokenForUserContract.Result> ExecuteAsync(GetStravaTokenForUserContract contract)
        {
            ValidateContract(contract);

            var stravaToken = await _context.Users.FirstOrDefaultAsync(x => x.AuthUserId == contract.UserId);

            if (stravaToken != null)
            {
                return new GetStravaTokenForUserContract.Result
                {
                    StravaToken = _mapper.Map<Data.Entities.User.User, StravaTokenModel>(stravaToken)
                };
            }
            else
            {
                return new GetStravaTokenForUserContract.Result();
            }
        }

        public void ValidateContract(GetStravaTokenForUserContract contract)
        {
            if (contract == null)
            {
                throw new ArgumentNullException(nameof(contract));
            }
            if (String.IsNullOrWhiteSpace(contract.UserId))
            {
                throw new ArgumentNullException(nameof(contract.UserId));
            }
        }
    }
}
