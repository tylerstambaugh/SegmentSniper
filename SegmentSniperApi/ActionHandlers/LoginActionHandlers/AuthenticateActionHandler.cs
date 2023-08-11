using SegmentSniper.Api.Models.User;
using SegmentSniper.Data;
using System.Text;
using XSystem.Security.Cryptography;

namespace SegmentSniper.Api.ActionHandlers.LoginActionHandlers
{
    public class AuthenticateActionHandler : IAuthenticateActionHandler
    {
        private readonly UserLogin _user;
        private readonly SegmentSniperDbContext _context;

        public AuthenticateActionHandler(UserLogin user, SegmentSniperDbContext context)
        {
            _user = user;
            _context = context;
        }

        public AuthenticateUserLoginContract.Result Execute(AuthenticateUserLoginContract contract)
        {
            var result = new AuthenticateUserLoginContract.Result();
            var dbUser = _context.Users.Where(x => x.UserName == contract.UserLogin.UserName).FirstOrDefault();

            if (dbUser != null)
            {
                var hashedPassword = GetHash(dbUser.PasswordHash, "salt string");
                var isCorrectPassword = CompareHash(contract.UserLogin.Password, hashedPassword, "salt string");
                if (isCorrectPassword)
                {
                    result.User = new User(dbUser.Email, dbUser.FirstName, dbUser.Id);
                }
            }
            return result;
        }

        public static byte[] GetHash(string password, string salt)
        {
            byte[] unhashedBytes = Encoding.Unicode.GetBytes(String.Concat(salt, password));

            SHA256Managed sha256 = new SHA256Managed();
            byte[] hashedBytes = sha256.ComputeHash(unhashedBytes);

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
