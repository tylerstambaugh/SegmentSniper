using SegmentSniper.Data.Entities.Auth;
using SegmentSniper.Models.Models.Auth.User;
using SegmentSniper.Services.AuthServices;

namespace SegmentSniper.Tests.Services.AuthServices.AuthticateUser
{
    [TestClass]
    public class Execute : TestBase
    {

        private AuthenticateUserContract _contract;
        private UserLogin _userLogin;
        private string UserName = "HarryB";
        private string FirstName = "Harry";
        private string LastName = "Ballsagna";
        private string Email = "ballsagana.H@gmail.com";
        private string Password = "Puteminyourmouth1!";
        private AuthenticateUserContract.Result _result;

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
        }

        private async Task ActAsync()
        {
            _result = await Service.ExecuteAsync(_contract);
        }
        [TestMethod]
        public async Task ShouldReturnUser_GivenSuccessfulLogin()
        {
            _contract = new AuthenticateUserContract(_userLogin);
            await ActAsync();

            Assert.AreEqual(UserName, _result.LoggedInUser.UserName);
        }

        [TestMethod]
        public async Task ShouldThrowArguementNullExceptin_GivenNullContract()
        {

            await Assert.ThrowsExceptionAsync<ArgumentNullException>(async () => await ActAsync(), "Value cannot be null. (Parameter 'UserLogin')");
        }

        [TestMethod]
        public async Task ShouldThrowArguementNullExceptin_GivenNullUserLogin()
        {
            _userLogin = null;
            _contract = new AuthenticateUserContract(_userLogin);

            await Assert.ThrowsExceptionAsync<ArgumentNullException>(async () => await ActAsync(), "Value cannot be null. (Parameter 'UserLogin')");
        }

        [DataTestMethod]
        [DataRow(null)]
        [DataRow("")]
        [DataRow(" ")]
        public async Task ShouldThrowArguementException_GivenInvalidUserName(string data)
        {
            _userLogin.UserName = data;
            _contract = new AuthenticateUserContract(_userLogin);

            await Assert.ThrowsExceptionAsync<ArgumentException>(async () => await ActAsync(), "Value cannot by null. (Parameter 'Password");
        }

        [DataTestMethod]
        [DataRow(null)]
        [DataRow("")]
        [DataRow(" ")]
        public async Task ShouldThrowArguementException_GivenInvalidPassword(string data)
        {
            _userLogin.Password = data;
            _contract = new AuthenticateUserContract(_userLogin);

            await Assert.ThrowsExceptionAsync<ArgumentException>(async () => await ActAsync(), "Value cannot by null. (Parameter 'Password");
        }
    }
}
