using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities.Auth;
using SegmentSniper.Services.AuthServices;

namespace SegmentSniper.Tests.Services.AuthServices.AuthticateUser
{
    [TestClass]
    public abstract class TestBase
    {
        protected UserManager<ApplicationUser> UserMgr;
        protected AuthenticateUser Service;
        protected SegmentSniperDbContext Context;
        protected List<ApplicationUser> _users = new List<ApplicationUser>();

        [TestInitialize]
        public virtual void Arrage()
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

            UserMgr = new UserManager<ApplicationUser>(
   new UserStore<ApplicationUser>(Context),
   null, // TODO: Provide IOptions<IdentityOptions>
   null, // TODO: Provide IPasswordHasher<ApplicationUser>
   null, // TODO: Provide IEnumerable<IUserValidator<ApplicationUser>>
   null, // TODO: Provide IEnumerable<IPasswordValidator<ApplicationUser>>
    null, // TODO: Provide ILookupNormalizer
   null, // TODO: Provide IdentityErrorDescriber
   serviceProvider, // This is the service provider
   null); // TODO: Provide ILogger<UserManager<ApplicationUser>>

            Service = new AuthenticateUser(Context, UserMgr);

            InternalArrange();
        }

        protected abstract void InternalArrange();
    }


}
