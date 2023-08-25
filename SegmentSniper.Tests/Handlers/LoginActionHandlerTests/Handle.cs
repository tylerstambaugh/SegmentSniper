using Microsoft.VisualStudio.TestTools.UnitTesting;
using SegmentSniper.Api.ActionHandlers.LoginActionHandlers;
using SegmentSniper.Data.Entities.Auth;
using SegmentSniper.Models.Models.Auth.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegmentSniper.Tests.Handlers.LoginActionHandlerTests
{
    [TestClass]
    public class Handle : TestBase
    {
        private LoginUserRequest _request;
        private LoginUserRequest.Response _response;
        private UserLogin _userLogin;
        private string UserName = "HarryB";
        private string FirstName = "Harry";
        private string LastName = "Ballsagna";
        private string Email = "ballsagana.H@gmail.com";
        private string Password = "Puteminyourmouth1!";

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
            var createUser = await _userMgr.CreateAsync(userToAdd, Password);

            _userLogin = new UserLogin
            {
                UserName = UserName,
                Password = Password,
            };
        }

        private async Task ActAsync()
        {
            _response = await Handler.Handle(_request);
        }

        [TestMethod]
        public async Task ShouldReturnResponseWithJWTToken_GivenValidRequest()
        {
            _request = new LoginUserRequest(_userLogin);
            ActAsync();
        }
    }
}
