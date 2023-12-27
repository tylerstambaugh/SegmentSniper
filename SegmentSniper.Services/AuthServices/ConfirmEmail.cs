using Microsoft.AspNetCore.Identity;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities.Auth;

namespace SegmentSniper.Services.AuthServices
{
    public class ConfirmEmail : IConfirmEmail
    {
        private readonly ISegmentSniperDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public ConfirmEmail(ISegmentSniperDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public bool Execute(ConfirmEmailContract contract)
        {
            var recordToUpdate = _context.EmailConfirmation.Where(r => r.UserId == contract.UserId);

            if(recordToUpdate.Any() )
            {
                _userManager.ConfirmEmailAsync(_userManager.FindByIdAsync(contract.UserId), )
            }
        }
    }
}
