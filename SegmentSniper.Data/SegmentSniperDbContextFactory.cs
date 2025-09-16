using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using SegmentSniper.Data;

public class SegmentSniperDbContextFactory : IDesignTimeDbContextFactory<SegmentSniperDbContext>
{
    public SegmentSniperDbContext CreateDbContext(string[] args)
    {        
        var cliConnection = args?.LastOrDefault();

        var envConnection = Environment.GetEnvironmentVariable("ConnectionStrings__SegmentSniperConnectionString");

        var config = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.Development.json", optional: true)
            .Build();

        var connectionString = cliConnection ?? envConnection ?? config.GetConnectionString("SegmentSniperConnectionString");

        if (string.IsNullOrWhiteSpace(connectionString))
            throw new InvalidOperationException("Connection string not found.");

        var optionsBuilder = new DbContextOptionsBuilder<SegmentSniperDbContext>();
        optionsBuilder.UseSqlServer(connectionString);

        return new SegmentSniperDbContext(optionsBuilder.Options);
    }

}
