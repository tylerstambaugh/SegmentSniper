using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Moq;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities;
using SegmentSniper.Tests.Helpers;
using System.Linq;

namespace SegmentSniper.Tests.Services.AuthServices.RegisterUser

{
    [TestClass]
    public abstract class TestBase
    {
        protected SegmentSniper.Services.AuthServices.RegisterUser Service;
        protected Mock<ISegmentSniperDbContext> Context;
        protected Mock<UserManager<ApplicationUser>> UserMgr;
        protected Mock<DbSet<ApplicationUser>> Users;
        protected List<ApplicationUser> _users = new List<ApplicationUser>();

        [TestInitialize]
        public virtual void Arrange()
        {            

            UserMgr = MockUserManager.MockUserMgr(_users);

            Context = new Mock<ISegmentSniperDbContext>().As<ISegmentSniperDbContext>();
                        
            Users = new Mock<DbSet<ApplicationUser>>();

            InternalArrange();
        }

        protected abstract void InternalArrange();
    }
}
