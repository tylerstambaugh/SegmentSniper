using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace SegmentSniper.Data
{
    public class SegmentSniperDbContextFactory : IDesignTimeDbContextFactory<SegmentSniperDbContext>
    {
        public SegmentSniperDbContext CreateDbContext(string[] args)
        {
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development";

            var configuration = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../SegmentSniperApi"))
                .AddJsonFile("appsettings.json", optional: true)
                .AddJsonFile($"appsettings.{environment}.json", optional: true)
                .Build();

            var connectionString = configuration.GetConnectionString("SegmentSniperConnectionString");

            if (string.IsNullOrEmpty(connectionString))
                throw new InvalidOperationException("Connection string 'SegmentSniperConnectionString' not found.");

            var optionsBuilder = new DbContextOptionsBuilder<SegmentSniperDbContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new SegmentSniperDbContext(optionsBuilder.Options);
        }
    }
}
