using SegmentSniper.Data;

namespace SegmentSniper.Services.User
{
    public class GetUserByStravaAthleteId : IGetUserByStravaAthleteId
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public GetUserByStravaAthleteId(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<GetUserByStravaAthleteIdContract.Result> ExecuteAsync(GetUserByStravaAthleteIdContract contract)
        {
            var user = _segmentSniperDbContext.Users
                .Where(u => u.StravaAthleteId == contract.StravaAthleteId)
                .FirstOrDefault();
            if (user == null)
            {
                return new GetUserByStravaAthleteIdContract.Result(null, "User not found");
            }
            return new GetUserByStravaAthleteIdContract.Result(user.AuthUserId, "");
        }
    }
}
