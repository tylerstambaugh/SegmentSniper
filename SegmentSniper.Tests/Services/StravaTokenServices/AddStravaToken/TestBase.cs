using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Moq;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities.Auth;

namespace SegmentSniper.Tests.Services.StravaTokenServices.AddStravaToken
{
    [TestClass]
    public abstract class TestBase
    {
        protected SegmentSniper.Services.StravaTokenServices.AddStravaToken Service;
        protected SegmentSniperDbContext Context;

        [TestInitialize]
        public virtual void Arrange()
        {
            var userManager = new UserManager<ApplicationUser>(
                Mock.Of<IUserStore<ApplicationUser>>(),
                null, null, null, null, null, null, null, null);
            var services = new ServiceCollection();
            services.AddDbContext<SegmentSniperDbContext>(options =>
                options.UseInMemoryDatabase(databaseName: "SegmentSniper"));

            var serviceProvider = services.BuildServiceProvider();

            var dbOptions = new DbContextOptionsBuilder<SegmentSniperDbContext>()
                .UseInMemoryDatabase(databaseName: "SegmentSniper")
                .Options;

            var operationalStoreOptions = Options.Create(new OperationalStoreOptions
            {
                ConfigureDbContext = builder =>
                {
                    builder.UseInMemoryDatabase("SegmentSniper");
                }
            });
            Context = new SegmentSniperDbContext(dbOptions, operationalStoreOptions);

            Service = new SegmentSniper.Services.StravaTokenServices.AddStravaToken(Context, userManager);

            InternalArrange();
        }
        protected abstract void InternalArrange();
    }
}
