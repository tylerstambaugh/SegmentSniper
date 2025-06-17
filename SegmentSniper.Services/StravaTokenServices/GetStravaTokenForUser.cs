using AutoMapper;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities.StravaToken;
using SegmentSniper.Models.Models.Strava.Token;

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

        public GetStravaTokenForUserContract.Result Execute(GetStravaTokenForUserContract contract)
        {
            ValidateContract(contract);

            var stravaToken = _context.StravaTokens.Where(x => x.UserId == contract.UserId).FirstOrDefault();

            return new GetStravaTokenForUserContract.Result
            {
                StravaToken = _mapper.Map<StravaApiToken, StravaTokenModel>(stravaToken)
            };
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
