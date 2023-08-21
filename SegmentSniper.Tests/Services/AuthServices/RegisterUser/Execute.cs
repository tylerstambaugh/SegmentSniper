using SegmentSniper.Data.Entities.Auth;
using SegmentSniper.Models.Models.Auth.User;
using SegmentSniper.Services.AuthServices;

namespace SegmentSniper.Tests.Services.AuthServices.RegisterUser
{
    [TestClass]
    public class Execute : TestBase
    {

        private RegisterUserContract _contract;
        private RegisterUserDto registerUser;
        private string UserName = "HarryB";
        private string FirstName = "Harry";
        private string LastName = "Ballsagna";
        private string Email = "ballsagana.H@gmail.com";
        private string Password = "Puteminyourmouth1!";
        private RegisterUserContract.Result newUser = new RegisterUserContract.Result();

        protected override void InternalArrange()
        {
            registerUser = new RegisterUserDto
            {
                UserName = UserName,
                FirstName = FirstName,
                LastName = LastName,
                Email = Email,
                Password = Password,
            };

            _contract = new RegisterUserContract(registerUser);

            _users.Add(new ApplicationUser
            {
                Id = "testId 1",
                FirstName = "Test",
                LastName = "Test",
                Email = "Test@email.com",
                UserName = "Test",
                NormalizedEmail = "Test",
                NormalizedUserName = "Test",
            });

        }

        private async Task ActAsync()
        {
            await Service.ExecuteAsync(_contract);
        }

        [TestMethod]
        public async Task ShouldMatchAddedUser()
        {
            await ActAsync();

            Assert.IsNotNull(Context.Object.Users.Where(u => u.UserName == _contract.RegisterUser.UserName).FirstOrDefault());
        }

        [DataTestMethod]
        [DataRow(null)]
        [DataRow("")]
        [DataRow(" ")]
        public async Task ShouldThrowArgumentNullException_GivenMissingUserName(string data)
        {
            registerUser.UserName = data;

            await Assert.ThrowsExceptionAsync<ArgumentNullException>(async () => await ActAsync(), "Value cannot be null. (Parameter 'UserName')");
        }

        [DataTestMethod]
        [DataRow(null)]
        [DataRow("")]
        [DataRow(" ")]
        public async Task ShouldThrowArgumentNullException_GivenMissingFirstName(string data)
        {
            registerUser.FirstName = data;

            await Assert.ThrowsExceptionAsync<ArgumentNullException>(async () => await ActAsync(), "Value cannot be null. (Parameter 'FirstName')");
        }

        [DataTestMethod]
        [DataRow(null)]
        [DataRow("")]
        [DataRow(" ")]
        public async Task ShouldThrowArgumentNullException_GivenMissingLastName(string data)
        {
            registerUser.LastName = data;

            await Assert.ThrowsExceptionAsync<ArgumentNullException>(async () => await ActAsync(), "Value cannot be null. (Parameter 'LastName')");
        }

        [DataTestMethod]
        [DataRow(null)]
        [DataRow("")]
        [DataRow(" ")]
        public async Task ShouldThrowArgumentNullException_GivenMissingEmail(string data)
        {
            registerUser.Email = data;

            await Assert.ThrowsExceptionAsync<ArgumentNullException>(async () => await ActAsync(), "Value cannot be null. (Parameter 'Email')");
        }

        [DataTestMethod]
        [DataRow(null)]
        [DataRow("")]
        [DataRow(" ")]
        public async Task ShouldThrowArgumentNullException_GivenMissingPassword(string data)
        {
            registerUser.Password = data;

            await Assert.ThrowsExceptionAsync<ArgumentNullException>(async () => await ActAsync(), "Value cannot be null. (Parameter 'Password')");
        }

        public async Task ShouldThrowArgumentNullException_GivenInvalidEmail()
        {
            registerUser.Email = "not@nemail";

            await Assert.ThrowsExceptionAsync<ArgumentException>(async () => await ActAsync(), "Invalid email address. (Parameter 'Email')");
        }

        [DataTestMethod]
        [DataRow("as")]
        [DataRow("$#@$#SDF")]
        [DataRow("3er45t")]
        [DataRow("QWE123qwe")]
        [DataRow("@#$432wer")]
        [DataRow("123!@#QWE")]
        public async Task ShouldThrowArgumentException_GivenInvalidPassword(string data)
        {
            registerUser.Password = data;

            await Assert.ThrowsExceptionAsync<ArgumentException>(async () => await ActAsync(), "Password does not meet criteria. (Parameter 'Password')");
        }

    }
}
