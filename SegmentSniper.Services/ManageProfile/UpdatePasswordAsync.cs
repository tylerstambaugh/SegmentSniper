//using Microsoft.AspNetCore.Identity;
//using SegmentSniper.Data;
//using SegmentSniper.Data.Entities.Auth;
//using SegmentSniper.Models.Models.ManageProfile;

//namespace SegmentSniper.Services.ManageProfile
//{
//    public class UpdatePasswordAsync : IUpdatePasswordAsync
//    {
//        private readonly ISegmentSniperDbContext _segmentSniperDbContext;
//        private readonly UserManager<ApplicationUser> _userManager;

//        public UpdatePasswordAsync(ISegmentSniperDbContext segmentSniperDbContext, UserManager<ApplicationUser> userManager)
//        {
//            _segmentSniperDbContext = segmentSniperDbContext;
//            _userManager = userManager;
//        }

//        public async Task<UpdatePasswordAsyncContract.Result> ExecuteAsync(UpdatePasswordAsyncContract contract)
//        {
//            ValidateContract(contract);

//            try
//            {
//                var user = await _userManager.FindByIdAsync(contract.UserId);
               

//                var updateResult = await _userManager.ChangePasswordAsync(user, contract.CurrentPassword, contract.NewPassword);

//                return new UpdatePasswordAsyncContract.Result(updateResult.Succeeded);                
//            }                

//            catch (Exception ex)
//            {
//                throw new Exception("Password could not be updated", ex);
//            }
//        }

//        private void ValidateContract(UpdatePasswordAsyncContract contract)
//        {
//            if (contract == null)
//            {
//                throw new ArgumentNullException(nameof(contract));
//            }

//            if (string.IsNullOrWhiteSpace(contract.UserId))
//            {
//                throw new ArgumentNullException(nameof(contract.UserId));
//            }

//            if (string.IsNullOrWhiteSpace(contract.CurrentPassword))
//            {
//                throw new ArgumentNullException(nameof(contract.CurrentPassword));
//            }
//            if (string.IsNullOrWhiteSpace(contract.NewPassword))
//            {
//                throw new ArgumentNullException(nameof(contract.NewPassword));
//            }

//            if (_segmentSniperDbContext.Users.Count(u => u.Id == contract.UserId) == 0)
//            {
//                throw new ApplicationException("User does not exist");
//            }
//        }
//    }
//}
