using SegmentSniper.Models.Models.User;
using Microsoft.EntityFrameworkCore;
using SegmentSniper.Services.AuthServices;
using SegmentSniper.Data.Entities;

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
        }

        private async Task ActAsync()
        {
           await Service.ExecuteAsync(_contract);
        }

        [TestMethod]
        public async Task ShouldCreateUser()
        {
           await ActAsync();

            var newUser = Context.Users.FirstOrDefault(x => x.UserName == UserName);

            Assert.IsNotNull(newUser);
        }

    }
}
