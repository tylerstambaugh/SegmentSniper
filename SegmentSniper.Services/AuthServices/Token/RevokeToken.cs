using Microsoft.AspNetCore.Identity;
using SegmentSniper.Data.Entities.Auth;

namespace SegmentSniper.Services.AuthServices.Token
{
    public class RevokeToken : IRevokeToken
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public RevokeToken(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }
        public async Task<RevokeTokenContract.Result> ExecuteSingleUser(RevokeTokenContract contract)
        {
            ValidateContract(contract);
            var user = await _userManager.FindByNameAsync(contract.UserName);
            if (user == null)
                throw new ArgumentException(nameof(contract.UserName));

            user.RefreshToken = null;
            await _userManager.UpdateAsync(user);

            return new RevokeTokenContract.Result { Success = true };
        }

        public async Task<bool> ExecuteAllUsers()
        {
            var users = _userManager.Users.ToList();
            foreach (var user in users)
            {
                user.RefreshToken = null;
                await _userManager.UpdateAsync(user);
            }

            return true;
        }

        private void ValidateContract(RevokeTokenContract contract)
        {
            if (contract == null)
            {
                throw new ArgumentNullException(nameof(contract), $"Value cannot be null. (Parameter 'contract') ");
            }
            if (string.IsNullOrWhiteSpace(contract.UserName))
            {
                throw new ArgumentException($"Value cannot be null ${nameof(contract.UserName)}", nameof(contract));
            }
        }
    }
}
