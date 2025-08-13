//using SegmentSniper.Data;
//using SegmentSniper.Models.Models.ManageProfile;

//namespace SegmentSniper.Services.ManageProfile
//{
//    public class UpdateFirstNameAsync : IUpdateFirstNameAsync
//    {
//        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

//        public UpdateFirstNameAsync(ISegmentSniperDbContext segmentSniperDbContext)
//        {
//            _segmentSniperDbContext = segmentSniperDbContext;
//        }

//        public async Task<UpdateFirstNameContract.Result> ExecuteAsync(UpdateFirstNameContract contract)
//        {
//            ValidateContract(contract);

//            try
//            {
//                var user = _segmentSniperDbContext.Users.Where(u => u.Id == contract.UserId).FirstOrDefault();
//                var stravaToken = _segmentSniperDbContext.StravaTokens.Where(t => t.UserId == contract.UserId).FirstOrDefault();

//                if (user != null)
//                {
//                    user.FirstName = contract.UpdatedName;
//                }

//                _segmentSniperDbContext.Users.Update(user);
//                _segmentSniperDbContext.SaveChanges();

//                var userProfile = new UserProfile
//                {
//                    ApplicationUser = user,
//                    StravaApiToken = stravaToken,
//                };

//                return new UpdateFirstNameContract.Result
//                {
//                   ProfileData = userProfile,
//                };
//            }
//            catch (Exception ex)
//            {
//                throw new ApplicationException("Error updating first name", ex);
//            }
//        }

//        private void ValidateContract(UpdateFirstNameContract contract)
//        {
//            if (contract == null)
//            {
//                throw new ArgumentNullException(nameof(contract));
//            }

//            if (string.IsNullOrWhiteSpace(contract.UserId))
//            {
//                throw new ArgumentNullException(nameof(contract.UserId));
//            }

//            if (string.IsNullOrWhiteSpace(contract.UpdatedName))
//            {
//                throw new ArgumentNullException(nameof(contract.UpdatedName));
//            }

//            if (_segmentSniperDbContext.Users.Count(u => u.Id == contract.UserId) == 0)
//            {
//                throw new ApplicationException("User does not exist");
//            }
//        }
//    }
//}
