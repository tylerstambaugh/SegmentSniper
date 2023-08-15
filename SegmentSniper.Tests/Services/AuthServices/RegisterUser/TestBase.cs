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
        protected UserManager<ApplicationUser> UserMgr;

        [TestInitialize]
        public virtual void Arrange()
        {
            var dbOptions = new DbContextOptionsBuilder<SegmentSniperDbContext>()
                .UseInMemoryDatabase(databaseName: "SegmentSniper")
                .Options;

            var operationalStoreOptions = Options.Create(new OperationalStoreOptions());
            Context = new SegmentSniperDbContext(dbOptions, operationalStoreOptions);

            var userStoreMock = new Mock<IUserStore<ApplicationUser>>();
            var userManagerOptions = Options.Create(new IdentityOptions());
            UserMgr = new UserManager<ApplicationUser>(userStoreMock.Object, userManagerOptions, null, null, null, null, null, null, null);

            Service = new SegmentSniper.Services.AuthServices.RegisterUser(Context, UserMgr);

            InternalArrange();
        }

        protected abstract void InternalArrange();
    }
}
