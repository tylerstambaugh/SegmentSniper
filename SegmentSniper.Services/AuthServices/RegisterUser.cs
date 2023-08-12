using SegmentSniper.Data;

namespace SegmentSniper.Services.AuthServices
{
    public class RegisterUser : IRegisterUser
    {
        private readonly ISegmentSniperDbContext _context;

        public RegisterUser(SegmentSniperDbContext context)
        {
            _context = context;
        }

        public void Execute(RegisterUserContract contract)
        {

        }
    }
}
