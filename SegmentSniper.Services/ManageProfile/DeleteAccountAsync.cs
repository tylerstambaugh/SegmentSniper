using Microsoft.AspNetCore.Identity;
using SegmentSniper.Data.Entities.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegmentSniper.Services.ManageProfile
{
    public class DeleteAccountAsync : IDeleteAccountAsync
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public DeleteAccountAsync(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<DeleteAccountAsyncContract.Result> ExecuteAsync(DeleteAccountAsyncContract contract)
        {
            ValidateContract(contract);
            var user = await _userManager.FindByIdAsync(contract.UserId);
            if (user == null)
            {
                throw new ApplicationException("User does not exist");
            }

            var result = await _userManager.DeleteAsync(user);

            return new DeleteAccountAsyncContract.Result(result.Succeeded);

        }

        private void ValidateContract(DeleteAccountAsyncContract contract)
        {
            if (contract == null)
            {
                throw new ArgumentNullException(nameof(contract));
            }

            if (string.IsNullOrWhiteSpace(contract.UserId))
            {
                throw new ArgumentNullException(nameof(contract.UserId));
            }

            
        }
    }
}
