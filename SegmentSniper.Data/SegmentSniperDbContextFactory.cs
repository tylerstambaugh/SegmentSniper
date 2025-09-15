using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using SegmentSniper.Data;

public class SegmentSniperDbContextFactory : IDesignTimeDbContextFactory<SegmentSniperDbContext>
{
    public SegmentSniperDbContext CreateDbContext(string[] args)
    {
        // Try CLI `--connection` first
        var arg = args?.FirstOrDefault(a => a.StartsWith("--connection="));
        var cliConnection = arg?.Split('=')[1];

        // Fall back to environment variable (GitHub Actions sets this)
        var envConnection = Environment.GetEnvironmentVariable("ConnectionStrings__SegmentSniperConnectionString");

        // Or load appsettings locally for dev
        var config = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.Development.json", optional: true)
            .Build();

        var connectionString =
            cliConnection ??
            envConnection ??
            config.GetConnectionString("SegmentSniperConnectionString");

        if (string.IsNullOrWhiteSpace(connectionString))
            throw new InvalidOperationException("Connection string not found.");

        var optionsBuilder = new DbContextOptionsBuilder<SegmentSniperDbContext>();
        optionsBuilder.UseSqlServer(connectionString);

        return new SegmentSniperDbContext(optionsBuilder.Options);
    }
}
