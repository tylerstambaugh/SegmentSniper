using Microsoft.AspNetCore.Identity;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SegmentSniper.Data.Entities.Auth;
using SegmentSniper.Models.Models.Auth.User;
using SegmentSniper.Services.AuthServices;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegmentSniper.Tests.Services.AuthServices.AuthticateUser
{
    [TestClass]
    public class Execute: TestBase
    {

        private AuthenticateUserContract _contract;
        private UserLogin _userLogin;
        private string UserName = "HarryB";
        private string FirstName = "Harry";
        private string LastName = "Ballsagna";
        private string Email = "ballsagana.H@gmail.com";
        private string Password = "Puteminyourmouth1!";
        protected override void InternalArrange()
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
            var createUser = UserMgr.CreateAsync(userToAdd, Password);

            _userLogin = new UserLogin
            {
                UserName = UserName,
                Password = Password,
            };
            _contract = new AuthenticateUserContract(_userLogin);
        }

        private async Task ActAsync()
        {
            await Service.ExecuteAsync(_contract);
        }

        [TestMethod]
        public async Task ShouldReturnUser_GivenSuccessfulLogin()
        {
            await ActAsync();
        }
    }
}
