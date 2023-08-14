using Azure.Identity;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using SegmentSniper.Models.Models.User;
using SegmentSniper.Services.AuthServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        private string Password = "Puteminyourmoth!";

        [TestInitialize]
        public override void Arrange()
        {
            base.Arrange();

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
    }
}
