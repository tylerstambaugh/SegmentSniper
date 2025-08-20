using SegmentSniper.Data;
using SegmentSniper.Services.Interface;

namespace SegmentSniper.Services.User
{
    public class GetUserByAuthId : IGetUserByAuthId, IExecutableServiceAsync<GetUserByAuthIdContract, GetUserByAuthIdContract.Result>
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public GetUserByAuthId(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<GetUserByAuthIdContract.Result> ExecuteAsync(GetUserByAuthIdContract contract)
        {
            ValidateContract(contract);

            var user = _segmentSniperDbContext.Users
                .Where(u => u.AuthUserId == contract.AuthUserId)
                .FirstOrDefault();
            if (user == null)
            {
                return new GetUserByAuthIdContract.Result(0, "User not found");
            }
            return new GetUserByAuthIdContract.Result(user.Id, "");
        }

        private void ValidateContract(GetUserByAuthIdContract contract)
        {

        }
    }
}
