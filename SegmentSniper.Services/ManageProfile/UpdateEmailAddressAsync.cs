using SegmentSniper.Data;
using SegmentSniper.Models.Models.ManageProfile;

namespace SegmentSniper.Services.ManageProfile
{
    public class UpdateEmailAddressAsync : IUpdateEmailAddressAsync
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public UpdateEmailAddressAsync(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<UpdateEmailAddressAsyncContract.Result> ExecuteAsync(UpdateEmailAddressAsyncContract contract)
        {
            ValidateContract(contract);


            try
            {
                var user = _segmentSniperDbContext.Users.Where(u => u.Id == contract.UserId).FirstOrDefault();
                var stravaToken = _segmentSniperDbContext.StravaToken.Where(t => t.UserId == contract.UserId).FirstOrDefault();

                if (user != null)
                {
                    user.Email = contract.UpdatedEmailAddress;
                    user.EmailConfirmed = false;
                }

                _segmentSniperDbContext.Users.Update(user);

                var userProfile = new UserProfile
                {
                    ApplicationUser = user,
                    StravaApiToken = stravaToken,
                };

                return new UpdateEmailAddressAsyncContract.Result
                {
                    UpdatedUser = userProfile,
                };
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error updating email address", ex);
            }
        }

        private void ValidateContract(UpdateEmailAddressAsyncContract contract)
        {
            if (contract == null)
            {
                throw new ArgumentNullException(nameof(contract));
            }

            if (string.IsNullOrWhiteSpace(contract.UserId))
            {
                throw new ArgumentNullException(nameof(contract.UserId));
            }

            if (string.IsNullOrWhiteSpace(contract.UpdatedEmailAddress))
            {
                throw new ArgumentNullException(nameof(contract.UpdatedEmailAddress));
            }

            if (_segmentSniperDbContext.Users.Count(u => u.Id == contract.UserId) == 0)
            {
                throw new ApplicationException("User does not exist");
            }
        }
    }
}
