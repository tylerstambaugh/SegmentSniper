using Microsoft.AspNetCore.Identity;
using SegmentSniper.Data.Entities.Auth;

namespace SegmentSniper.Services.AuthServices
{
    public class ResetPassword : IResetPassword
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public ResetPassword(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<PasswordResetContract.Result> ExecuteAsync(PasswordResetContract contract)
        {
            ValidateContract(contract);

            var user = await _userManager.FindByIdAsync(contract.UserId);
            if (user != null)
            {
                try
                {
                    var updateResult = await _userManager.ResetPasswordAsync(user, contract.ChangePasswordToken, contract.NewPassword);
                    if (updateResult.Succeeded)
                    {
                        return new PasswordResetContract.Result(true);
                    }
                    else
                    {
                        throw new ApplicationException($"Password reset failed: {updateResult.Errors}");
                    }
                }
                catch 
                {
                    throw;
                }
            }
            else
            {
                throw new ArgumentException("User not found");
            }
        }

        private void ValidateContract(PasswordResetContract contract)
        {
            if (contract == null)
            {
                throw new ArgumentNullException(nameof(contract));
            }
            if (string.IsNullOrWhiteSpace(contract.UserId))
            {
                throw new ArgumentException(nameof(contract.UserId));
            }
            if (string.IsNullOrWhiteSpace(contract.NewPassword))
            {
                throw new ArgumentException(nameof(contract.NewPassword));
            }
            if (string.IsNullOrWhiteSpace(contract.ChangePasswordToken))
            {
                throw new ArgumentException(nameof(contract.ChangePasswordToken));
            }
        }
    }
}
