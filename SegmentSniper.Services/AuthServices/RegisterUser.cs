using SegmentSniper.Data;
using System.Net.Mail;
using System.Text.RegularExpressions;

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
            ValidateContract(contract);

            //check to see if user already exists

            //create user 

            //insert into db
        }

        private void ValidateContract(RegisterUserContract contract)
        {
            if(contract is null)
            {
                throw new ArgumentNullException(nameof(contract));
            }

            if(string.IsNullOrWhiteSpace(contract.RegisterUser.FirstName))
            {
                throw new ArgumentNullException(nameof(contract.RegisterUser.FirstName));
            }

            if (string.IsNullOrWhiteSpace(contract.RegisterUser.LastName))
            {
                throw new ArgumentNullException(nameof(contract.RegisterUser.LastName));
            }

            if (string.IsNullOrWhiteSpace(contract.RegisterUser.Email))
            {
                throw new ArgumentNullException(nameof(contract.RegisterUser.Email));
            }
            if (!IsValidEmail(contract.RegisterUser.Email))
            {
                throw new ArgumentException("Invalid email address", nameof(contract.RegisterUser.Email));
            }
            if (string.IsNullOrWhiteSpace(contract.RegisterUser.Password))
            {
                throw new ArgumentNullException(nameof(contract.RegisterUser.Password));
            }
            if(!IsValidPassword(contract.RegisterUser.Password))
            {
                throw new ArgumentException("Password does not meet criteria", nameof(contract.RegisterUser.Password));
            }
        }

        private bool IsValidEmail(string email)
        {
            var pattern = @"^[a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";

            var regex = new Regex(pattern);
            return regex.IsMatch(email);
        }
        private bool IsValidPassword(string password)
        {
            return password.Length > 5;
        }
    }
}
