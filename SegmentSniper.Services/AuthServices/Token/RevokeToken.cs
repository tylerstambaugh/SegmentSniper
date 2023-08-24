using Microsoft.AspNetCore.Identity;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegmentSniper.Services.AuthServices.Token
{
    public class RevokeToken : IRevokeToken
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public RevokeToken(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }
        public async Task<RevokeTokenContract.Result> Execute(RevokeTokenContract contract)
        {
            ValidateContract(contract);
            var user = await _userManager.FindByNameAsync(contract.UserName);
            if (user == null) 
                throw new ArgumentException(nameof(contract.UserName));

            user.RefreshToken = null;
            await _userManager.UpdateAsync(user);            

            return new RevokeTokenContract.Result { Success = true };
        }

        private void ValidateContract(RevokeTokenContract contract)
        {
           if(contract == null)
            {
                throw new ArgumentNullException(nameof(contract), $"Value cannot be null. (Parameter 'contract') ");
            }
           if(string.IsNullOrWhiteSpace(contract.UserName))
            {
                throw new ArgumentException($"Value cannot be null ${nameof(contract.UserName)}", nameof(contract));
            }
        }
    }
}
