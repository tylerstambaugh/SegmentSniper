using SegmentSniper.Data.Entities;
using SegmentSniper.Models.Models.User;
using SegmentSniper.Services.AuthServices;
using System.Linq;
using System.Collections.Generic;

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

            IQueryable<ApplicationUser> queryableUsers = _users.AsQueryable();
            Users.As<IQueryable<ApplicationUser>>().Setup(m => m.Provider).Returns(queryableUsers.Provider);
            Users.As<IQueryable<ApplicationUser>>().Setup(m => m.Expression).Returns(queryableUsers.Expression);
            Users.As<IQueryable<ApplicationUser>>().Setup(m => m.ElementType).Returns(queryableUsers.ElementType);
            Users.As<IQueryable<ApplicationUser>>().Setup(m => m.GetEnumerator()).Returns(() => queryableUsers.GetEnumerator());

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
