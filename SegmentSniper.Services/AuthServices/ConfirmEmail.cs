//using Microsoft.AspNetCore.Identity;
//using SegmentSniper.Data;
//using SegmentSniper.Data.Entities.Auth;

//namespace SegmentSniper.Services.AuthServices
//{
//    public class ConfirmEmail : IConfirmEmail
//    {
//        private readonly UserManager<ApplicationUser> _userManager;

//        public ConfirmEmail(UserManager<ApplicationUser> userManager)
//        {
//            _userManager = userManager;
//        }

//        public async Task<ConfirmEmailContract.Result> ExecuteAsync(ConfirmEmailContract contract)
//        {
//            ValidateContract(contract);

//            var user = await _userManager.FindByIdAsync(contract.UserId);
//            if (user != null )
//            {                
//                var updateResult = await _userManager.ConfirmEmailAsync(user, contract.ConfirmationToken);

//                return new ConfirmEmailContract.Result(updateResult.Succeeded);
//            }
//            else
//            {
//                return new ConfirmEmailContract.Result(false);
//            }
//        }

//        private void ValidateContract(ConfirmEmailContract contract)
//        {
//            if (contract == null)
//            {
//                throw new ArgumentNullException(nameof(contract));
//            }
//            if (string.IsNullOrWhiteSpace(contract.UserId))
//            {
//                throw new ArgumentException(nameof(contract.UserId));
//            }
//            if (string.IsNullOrWhiteSpace(contract.ConfirmationToken))
//            {
//                throw new ArgumentException(nameof(contract.ConfirmationToken));
//            }
//        }
//    }
//}
