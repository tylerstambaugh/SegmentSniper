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
        protected List<ApplicationUser> _users = new List<ApplicationUser>();

        [TestInitialize]
        public virtual void Arrange()
        {

            UserMgr = MockUserManager.MockUserMgr(_users);

            Context = new Mock<ISegmentSniperDbContext>().As<ISegmentSniperDbContext>();

            Users = new Mock<DbSet<ApplicationUser>>();

            IQueryable<ApplicationUser> queryableUsers = _users.AsQueryable();
            Users.As<IQueryable<ApplicationUser>>().Setup(m => m.Provider).Returns(queryableUsers.Provider);
            Users.As<IQueryable<ApplicationUser>>().Setup(m => m.Expression).Returns(queryableUsers.Expression);
            Users.As<IQueryable<ApplicationUser>>().Setup(m => m.ElementType).Returns(queryableUsers.ElementType);
            Users.As<IQueryable<ApplicationUser>>().Setup(m => m.GetEnumerator()).Returns(() => queryableUsers.GetEnumerator());

            Context.Setup(ctx => ctx.Users).Returns(Users.Object);

            Service = new SegmentSniper.Services.AuthServices.RegisterUser(Context.Object, UserMgr.Object);

            InternalArrange();
        }

        protected abstract void InternalArrange();
    }
}
