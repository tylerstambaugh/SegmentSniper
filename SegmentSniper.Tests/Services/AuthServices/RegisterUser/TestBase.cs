using SegmentSniper.Data;
using Moq;
using Microsoft.AspNetCore.Identity;
using SegmentSniper.Data.Entities;

namespace SegmentSniper.Tests.Services.AuthServices.RegisterUser

{
    [TestClass]
    public abstract class TestBase
    {
        protected SegmentSniper.Services.AuthServices.RegisterUser Service;
        protected Mock<ISegmentSniperDbContext> Context;
        protected Mock<UserManager<ApplicationUser>> UserMgr;

        [TestInitialize]
        public virtual void Arrange()
        {
            UserMgr = new Mock<UserManager<ApplicationUser>>();
            Context = new Mock<ISegmentSniperDbContext>();
            Service = new SegmentSniper.Services.AuthServices.RegisterUser(Context.Object, UserMgr.Object);
        }
    }
}
