using Microsoft.AspNetCore.Identity;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities.Auth;

namespace SegmentSniper.Services.AuthServices
{
    public class ConfirmEmail : IConfirmEmail
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public ConfirmEmail(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<bool> Execute(ConfirmEmailContract contract)
        {
            var user = await _userManager.FindByIdAsync(contract.UserId);
            if (user != null )
            {
                var updateResult = await _userManager.ConfirmEmailAsync(user, contract.ConfirmationToken);

                return updateResult.Succeeded;
            }
            else
            {
                return false;
            }
        }
    }
}
