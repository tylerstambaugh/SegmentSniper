using Microsoft.AspNetCore.Identity;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities;
using SegmentSniper.Models.Models.User;
using System.Text.RegularExpressions;

namespace SegmentSniper.Services.AuthServices
{
    public class RegisterUser : IRegisterUser
    {
        private readonly ISegmentSniperDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public RegisterUser(ISegmentSniperDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<RegisterUserContract.Result> ExecuteAsync(RegisterUserContract contract)
        {
            ValidateContract(contract);

            try
            {
                ApplicationUser userToAdd = new ApplicationUser
                {
                    Id = Guid.NewGuid().ToString(),
                    UserName = contract.RegisterUser.UserName,
                    NormalizedUserName = contract.RegisterUser.UserName,
                    FirstName = contract.RegisterUser.FirstName,
                    LastName = contract.RegisterUser.LastName,
                    Email = contract.RegisterUser.Email,
                    NormalizedEmail = contract.RegisterUser.Email,
                    SecurityStamp = Guid.NewGuid().ToString(),

                };
                var createUser = await _userManager.CreateAsync(userToAdd);

                if(createUser.Succeeded)
                {

                    var dbUser = _context.Users.Where(x => x.Email ==  contract.RegisterUser.Email).FirstOrDefault();

                    var registeredUser = new RegisterUserContract.Result
                    {
                        RegisteredUser = new UserDto(dbUser.Id, dbUser.FirstName, dbUser.Email)
                    };

                    return registeredUser;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException("unable to create user");
            }

            return null;
        }





        private void ValidateContract(RegisterUserContract contract)
        {
            if (contract is null)
            {
                throw new ArgumentNullException(nameof(contract));
            }

            if (string.IsNullOrWhiteSpace(contract.RegisterUser.FirstName))
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

            if (_userManager.FindByEmailAsync(contract.RegisterUser.Email) != null)
            {
                throw new ArgumentException("Account with email already exists.", nameof(contract));
            }

            if (!IsValidEmail(contract.RegisterUser.Email))
            {
                throw new ArgumentException("Invalid email address", nameof(contract.RegisterUser.Email));
            }

            if (string.IsNullOrWhiteSpace(contract.RegisterUser.Password))
            {
                throw new ArgumentNullException(nameof(contract.RegisterUser.Password));
            }

            if (!IsValidPassword(contract.RegisterUser.Password))
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
