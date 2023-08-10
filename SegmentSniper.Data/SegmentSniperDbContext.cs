using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SegmentSniper.Data.Entities;

namespace SegmentSniper.Data
{
    public class SegmentSniperDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public SegmentSniperDbContext(DbContextOptions<SegmentSniperDbContext> options, IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
            
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder
            //    .UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;AttachDbFilename=|DataDirectory|StravaSegmentSniperAuthorizationData.mdf;Initial Catalog=StravaSegmentSniperData;Trusted_Connection=True;MultipleActiveResultSets=true");
        }


    }
}