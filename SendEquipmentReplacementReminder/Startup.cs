using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SegmentSniper.Data;

[assembly: FunctionsStartup(typeof(SendEquipmentReplacementReminder.Startup))]
namespace SendEquipmentReplacementReminder
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            var connectionString = Environment.GetEnvironmentVariable("SegmentSniperConnectionString");

            // Scoped lifetime is correct for EF Core
            builder.Services.AddDbContext<SegmentSniperDbContext>(options =>
                options.UseSqlServer(connectionString));

            // Register other services or repositories here
            
        }
    }
}
