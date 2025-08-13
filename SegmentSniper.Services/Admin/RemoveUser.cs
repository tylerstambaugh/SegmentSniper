//using Microsoft.AspNetCore.Identity;
//using SegmentSniper.Data.Entities.Auth;

//namespace SegmentSniper.Services.Admin
//{
//    public class RemoveUser : IRemoveUser
//    {
//        private readonly UserManager<ApplicationUser> _userManager;

//        public RemoveUser(UserManager<ApplicationUser> userManager)
//        {
//            _userManager = userManager;
//        }

//        public async Task<RemoveUserContract.Result> ExecuteAsync(RemoveUserContract contract)
//        {
//            ValidateContract(contract);

//            try
//            {
//                var user = await _userManager.FindByIdAsync(contract.UserId);

//                if (user == null)
//                {
//                    throw new ApplicationException("User not found");
//                }

//                var result = await _userManager.DeleteAsync(user);

//                return new RemoveUserContract.Result { Success = result.Succeeded };
//            }
//            catch (Exception ex)
//            {
//                throw;
//            }
//        }

//        private void ValidateContract(RemoveUserContract contract)
//        {
//            if (contract == null)
//            {
//                throw new ArgumentNullException(nameof(contract));
//            }

//            if (string.IsNullOrWhiteSpace(contract.UserId))
//            {
//                throw new ArgumentException(nameof(contract.UserId));
//            }
//        }
//    }
//}
