using Microsoft.AspNetCore.Identity;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SegmentSniper.Data.Entities.Auth;
using SegmentSniper.Models.Models.Auth.User;
using SegmentSniper.Services.AuthServices;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace SegmentSniper.Tests.Services.AuthServices.AuthticateUser
{
    [TestClass]
    public class Execute : TestBase
    {

        private AuthenticateUserContract? _contract;
        private UserLogin _userLogin;
        private string UserName = "HarryB";
        private string FirstName = "Harry";
        private string LastName = "Ballsagna";
        private string Email = "ballsagana.H@gmail.com";
        private string Password = "Puteminyourmouth1!";
        private AuthenticateUserContract.Result _loggedInUser;

        protected override async Task InternalArrangeAsync()
        {

            ApplicationUser userToAdd = new ApplicationUser
            {
                Id = Guid.NewGuid().ToString(),
                UserName = UserName,
                NormalizedUserName = UserName,
                FirstName = FirstName,
                LastName = LastName,
                Email = Email,
                NormalizedEmail = Email,
                SecurityStamp = Guid.NewGuid().ToString(),

            };
            var createUser = await UserMgr.CreateAsync(userToAdd, Password);

            _userLogin = new UserLogin
            {
                UserName = UserName,
                Password = Password,
            };

            _contract = new AuthenticateUserContract(_userLogin);
        }

        private async Task ActAsync()
        {
           _loggedInUser = await Service.ExecuteAsync(_contract);
        }

        [TestMethod]
        public async Task ShouldReturnUser_GivenSuccessfulLogin()
        {
            await ActAsync();

            Assert.IsNotNull(_loggedInUser);
        }

        [TestMethod]
        public async Task ShouldThrowArguementNullExceptin_GivenNullUserLogin()
        {
            _userLogin = null;
            _contract = new AuthenticateUserContract(_userLogin);

            Assert.ThrowsException<ArgumentNullException>(async () => await ActAsync(), "Value cannot be null. (Parameter 'UserLogin')");
        }
    }
}
