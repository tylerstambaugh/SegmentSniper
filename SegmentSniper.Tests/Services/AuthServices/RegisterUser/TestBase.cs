using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Moq;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities;

namespace SegmentSniper.Tests.Services.AuthServices.RegisterUser

{
    [TestClass]
    public abstract class TestBase
    {
        protected SegmentSniper.Services.AuthServices.RegisterUser Service;
        protected ISegmentSniperDbContext Context;
        protected Mock<UserManager<ApplicationUser>> UserMgr;

        [TestInitialize]
        public virtual void Arrange()
        {
            var dbOptions = new DbContextOptionsBuilder<SegmentSniperDbContext>()
                .UseInMemoryDatabase(databaseName: "AxisCore")
                .Options;

            var operationalStoreOptions = Options.Create(new OperationalStoreOptions());
            Context = new SegmentSniperDbContext(dbOptions, operationalStoreOptions);

            UserMgr = new Mock<UserManager<ApplicationUser>>();
            Service = new SegmentSniper.Services.AuthServices.RegisterUser(Context, UserMgr.Object);
        }
    }
}
