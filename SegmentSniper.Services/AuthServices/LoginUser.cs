using Microsoft.AspNetCore.Identity;
using SegmentSniper.Data;
using SegmentSniper.Models.Models.Auth.User;

namespace SegmentSniper.Services.AuthServices
{
    public class LoginUser : ILoginUser
    {
        private readonly ISegmentSniperDbContext _context;

        public LoginUser(ISegmentSniperDbContext context)
        {
            _context = context;
        }

        public LoginUserContract.Result Execute(LoginUserContract contract)
        {
            var result = new LoginUserContract.Result();

            var dbUser = _context.Users.Where(x => x.UserName == contract.UserLogin.UserName).FirstOrDefault();

            if (dbUser != null)
            {

                var isCorrectPassword = new PasswordHasher<object>().VerifyHashedPassword(null, dbUser.PasswordHash, contract.UserLogin.Password);
                if (isCorrectPassword == PasswordVerificationResult.Success)
                {
                    result = new LoginUserContract.Result
                    {
                        LoggedInUser = new UserDto(dbUser.Email, dbUser.UserName, dbUser.FirstName, dbUser.Id)
                    };
                }
                else
                {
                    throw new ArgumentException("Invalid login", nameof(contract));
                }
            }
            else
            {
                throw new ArgumentException("Invalid login", nameof(contract));
            }
            return result;
        }
    }
}
