using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities.Auth;
using SegmentSniper.Models.Models.Auth.User;
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

            var user = new RegisterUserContract.Result();

            try
            {
                ApplicationUser userToAdd = new ApplicationUser
                {
                    Id = Guid.NewGuid().ToString(),
                    UserName = contract.RegisterUser.Email,
                    NormalizedUserName = contract.RegisterUser.Email,
                    FirstName = contract.RegisterUser.FirstName,
                    Email = contract.RegisterUser.Email,
                    NormalizedEmail = contract.RegisterUser.Email,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    EmailConfirmed = false,

                };
                var createUser = await _userManager.CreateAsync(userToAdd, contract.RegisterUser.Password);

                if (createUser.Succeeded)
                {

                    await _userManager.AddToRoleAsync(userToAdd, "User");

                    var dbUser = _context.Users.Where(x => x.Email == contract.RegisterUser.Email).FirstOrDefault();

                    user.RegisteredUser = new UserDto 
                    { 
                        Id = dbUser.Id, 
                        FirstName = dbUser.FirstName, 
                        Email = dbUser.Email, 
                        HasStravaTokenData = false
                    };
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException("unable to create user");
            }

            return user;
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

            if (string.IsNullOrWhiteSpace(contract.RegisterUser.Email))
            {
                throw new ArgumentNullException(nameof(contract.RegisterUser.Email));
            }

            if (_userManager.Users.Where(x => x.Email == contract.RegisterUser.Email).Count() > 0)
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

            if (!IsValidPassword(contract.RegisterUser.Password).Result)
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
        private async Task<bool> IsValidPassword(string password)
        {
            var passwordValidator = new PasswordValidator<ApplicationUser>();
            var result = await passwordValidator.ValidateAsync(_userManager, null, password);

            return result.Succeeded;

        }
    }
}
