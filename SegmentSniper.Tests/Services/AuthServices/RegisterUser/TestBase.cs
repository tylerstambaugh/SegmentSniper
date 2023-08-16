using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Moq;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities;
using SegmentSniper.Tests.Helpers;

namespace SegmentSniper.Tests.Services.AuthServices.RegisterUser

{
    [TestClass]
    public abstract class TestBase
    {
        protected SegmentSniper.Services.AuthServices.RegisterUser Service;
        protected Mock<ISegmentSniperDbContext> Context;
        protected Mock<UserManager<ApplicationUser>> UserMgr;
        protected Mock<DbSet<ApplicationUser>> Users;

        [TestInitialize]
        public virtual void Arrange()
        {
            List<ApplicationUser> _users = new List<ApplicationUser>
            {
              new ApplicationUser
              {
                  Id = "testId 1",
                  FirstName = "Test",
                  LastName = "Test",
                  Email = "Test@email.com",
                  UserName = "Test",
                  NormalizedEmail = "Test",
                  NormalizedUserName = "Test",
              }
            };

            UserMgr = MockUserManager.MockUserMgr(_users);

            Context = new Mock<ISegmentSniperDbContext>();
                        
            Users = new Mock<DbSet<ApplicationUser>>();

            InternalArrange();
        }

        protected abstract void InternalArrange();
    }
}
