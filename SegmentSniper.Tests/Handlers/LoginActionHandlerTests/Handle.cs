using SegmentSniper.Api.ActionHandlers.LoginActionHandlers;
using SegmentSniper.Data.Entities.Auth;
using SegmentSniper.Models.Models.Auth.User;

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
            await ActAsync();

            Assert.IsNotNull(_response.TokenData.AccessToken);
        }

        [TestMethod]
        public async Task ShouldThrowArgumentNullException_GivenNullRequest()
        {
            _request = null;
            await Assert.ThrowsExceptionAsync<ArgumentNullException>(async () => await ActAsync(), "Value cannot be null. (Parameter 'Request')");
        }

        [TestMethod]
        public async Task ShouldThrowArgumentNullException_GivenNullUserLogin()
        {
            _userLogin = null;
            await Assert.ThrowsExceptionAsync<ArgumentNullException>(async () => await ActAsync(), "Value cannot be null. (Parameter 'UserLogin')");
        }

        [DataTestMethod]
        [DataRow(null)]
        [DataRow("")]
        [DataRow(" ")]
        public async Task ShouldThrowArgumentException_GivenMissingUserName(string data)
        {
            _userLogin.UserName = data;

            await Assert.ThrowsExceptionAsync<ArgumentException>(async () => await ActAsync(), "Value cannot be null. (Parameter 'Username')");
        }

        [DataTestMethod]
        [DataRow(null)]
        [DataRow("")]
        [DataRow(" ")]
        public async Task ShouldThrowArgumentException_GivenMissingPassword(string data)
        {
            _userLogin.Password = data;

            await Assert.ThrowsExceptionAsync<ArgumentException>(async () => await ActAsync(), "Value cannot be null. (Parameter 'Password')");
        }
    }
}
