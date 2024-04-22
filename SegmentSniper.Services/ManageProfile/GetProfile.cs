using SegmentSniper.Data;
using SegmentSniper.Models.Models.ManageProfile;

namespace SegmentSniper.Services.ManageProfile
{
    public class GetProfile : IGetProfile
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public GetProfile(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<GetProfileContract.Result> ExecuteAsync(GetProfileContract contract)
        {
            var user = _segmentSniperDbContext.Users.Where(u => u.Id == contract.UserId).FirstOrDefault();
            var stravaToken = _segmentSniperDbContext.StravaTokens.Where(t => t.UserId == contract.UserId).FirstOrDefault();

            var userProfile = new UserProfile
            {
                ApplicationUser = user,
                StravaApiToken = stravaToken,
            };  

            return new GetProfileContract.Result
            {
                Profile = userProfile,
            };
        }
    }


}
