using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data.Entities.Auth;

namespace SegmentSniper.Services.Admin
{
    public class GetUsers : IGetUsers
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public GetUsers(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<GetUserContract.Result> ExecuteAsync()
        {
            var users =  await _userManager.Users.ToListAsync();

            return new GetUserContract.Result
            {
                Users = users,
            };
        }
    }
}
