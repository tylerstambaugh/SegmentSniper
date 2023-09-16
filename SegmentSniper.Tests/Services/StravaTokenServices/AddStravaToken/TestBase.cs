using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using SegmentSniper.Data;

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

            Service = new SegmentSniper.Services.StravaTokenServices.AddStravaToken(Context);

            InternalArrange();
        }
        protected abstract void InternalArrange();
    }
}
