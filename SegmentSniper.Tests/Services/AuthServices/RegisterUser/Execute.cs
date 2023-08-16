using SegmentSniper.Models.Models.User;
using Microsoft.EntityFrameworkCore;
using SegmentSniper.Services.AuthServices;
using SegmentSniper.Data.Entities;
using SevenCorners.UnitTest.Helper;

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
        private List<ApplicationUser> _users = new List<ApplicationUser>();
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
                FirstName = "fname1",
                LastName = "lname1",

            });

            var dbUsers = MockHelper.CreateMockDbSet(_users);
            Context.Setup(ctx => ctx.Users).Returns(Users.Object);

            Service = new SegmentSniper.Services.AuthServices.RegisterUser(Context.Object, UserMgr.Object);
        }

        private async Task ActAsync()
        {
           newUser = await Service.ExecuteAsync(_contract);
        }

        [TestMethod]
        public async Task ShouldReturnNonNullUser()
        {
            await ActAsync();

            Assert.IsNotNull(newUser);
        }

    }
}
