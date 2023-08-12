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
                var hashedPassword = GetHash(dbUser.PasswordHash, "salt string");
                var isCorrectPassword = CompareHash(contract.UserLogin.Password, hashedPassword, "salt string");
                if (isCorrectPassword)
                {
                     result = new AuthenticateUserContract.Result
                    {
                        AuthenticatedUser = new UserDto(dbUser.Email, dbUser.FirstName, dbUser.Id)
                    };
                }
            }
            return result;

        }

        public static byte[] GetHash(string password, string salt)
        {
            byte[] unhashedBytes = Encoding.Unicode.GetBytes(String.Concat(salt, password));

            var hmac = new HMACSHA512();
            byte[] hashedBytes = hmac.ComputeHash(unhashedBytes);

            return hashedBytes;
        }

        public static bool CompareHash(string attemptedPassword, byte[] hash, string salt)
        {
            string base64Hash = Convert.ToBase64String(hash);
            string base64AttemptedHash = Convert.ToBase64String(GetHash(attemptedPassword, salt));

            return base64Hash == base64AttemptedHash;
        }
    }
}
