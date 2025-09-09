using SegmentSniper.Data;
using SegmentSniper.Models.User;
using SegmentSniper.Services.Interface;

namespace SegmentSniper.Services.User
{
    public class GetAppUserByAuthId : IGetAppUserByAuthId, IExecutableServiceAsync<GetAppUserByAuthIdContract, GetAppUserByAuthIdContract.Result>
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public GetAppUserByAuthId(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<GetAppUserByAuthIdContract.Result> ExecuteAsync(GetAppUserByAuthIdContract contract)
        {
            ValidateContract(contract);

            var user = _segmentSniperDbContext.Users
                .Where(u => u.AuthUserId == contract.AuthUserId)
                .Select(u => new
                {                                   
                    u.AuthUserId,
                    u.StravaAthleteId,
                    u.StravaRefreshToken,
                    u.StravaTokenExpiresIn,
                    u.StravaTokenExpiresAt
                })
                .FirstOrDefault();
            if (user == null)
            {
                return new GetAppUserByAuthIdContract.Result();
            }
            var userToReturn = new AppUserModel();

            userToReturn.AuthUserId = user.AuthUserId;
            userToReturn.StravaRefreshToken = user.StravaRefreshToken;

            return new GetAppUserByAuthIdContract.Result(userToReturn);
        }

        private void ValidateContract(GetAppUserByAuthIdContract contract)
        {

        }
    }
}
