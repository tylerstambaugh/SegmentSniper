using SegmentSniper.Data;
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
                .FirstOrDefault();
            if (user == null)
            {
                return new GetAppUserByAuthIdContract.Result();
            }
            return new GetAppUserByAuthIdContract.Result(user);
        }

        private void ValidateContract(GetAppUserByAuthIdContract contract)
        {

        }
    }
}
