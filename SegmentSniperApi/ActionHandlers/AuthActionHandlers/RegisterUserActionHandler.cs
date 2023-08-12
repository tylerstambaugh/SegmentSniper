using SegmentSniper.Data;
using SegmentSniper.Models.Models.User;
using System.Security.Cryptography;

namespace SegmentSniper.Api.ActionHandlers.AuthActionHandlers
{
    public class RegisterUserActionHandler : IRegisterUserActionHandler
    {
        private readonly ISegmentSniperDbContext _context;

        public RegisterUserActionHandler(ISegmentSniperDbContext context)
        {
            _context = context;
        }

        public async Task<UserDto> Handle(RegisterUserRequest request)
        {
            CreatePasswordHash(request.User.Password, out byte[] passwordHash);

            throw new NotImplementedException();

        }

        private void CreatePasswordHash(string password, out byte[] passwordHash)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}
