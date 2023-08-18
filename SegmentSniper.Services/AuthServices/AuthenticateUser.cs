using Microsoft.AspNetCore.Identity;
using SegmentSniper.Data;
using SegmentSniper.Models.Models.User;
using System.Security.Cryptography;
using System.Text;
namespace SegmentSniper.Services.AuthServices
{
    public class AuthenticateUser : IAuthenticateUser
    {
        private readonly ISegmentSniperDbContext _context;

        public AuthenticateUser(ISegmentSniperDbContext context)
        {
            _context = context;
        }

        public AuthenticateUserContract.Result Execute(AuthenticateUserContract contract)
        {
            var result = new AuthenticateUserContract.Result();

            var dbUser = _context.Users.Where(x => x.UserName == contract.UserLogin.UserName).FirstOrDefault();
            
            if (dbUser != null)
            {

                var isCorrectPassword = new PasswordHasher<object>().VerifyHashedPassword(null, dbUser.PasswordHash, contract.UserLogin.Password);
                if (isCorrectPassword == PasswordVerificationResult.Success)
                {
                     result = new AuthenticateUserContract.Result
                    {
                        AuthenticatedUser = new UserDto(dbUser.Email, dbUser.UserName, dbUser.FirstName, dbUser.Id)
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
