using Azure.Identity;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Azure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SegmentSniper.Data;

var builder = FunctionsApplication.CreateBuilder(args);

builder.Logging.AddConsole();
builder.Logging.SetMinimumLevel(LogLevel.Debug);

var startupLogger = LoggerFactory.Create(logging =>
{
    logging.AddConsole();
}).CreateLogger("Startup");

builder.ConfigureFunctionsWebApplication();

builder.Services
    .AddApplicationInsightsTelemetryWorkerService()
    .ConfigureFunctionsApplicationInsights();

// Determine environment from launchSettings or Azure
var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")
                  ?? "Development";

builder.Configuration
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile("appsettings.json", optional: false)
    .AddJsonFile($"appsettings.{environment}.json", optional: true)
    .AddEnvironmentVariables();

// LOCAL environments (Development, ProductionLocal)
if (environment is "Development" or "ProductionLocal")
{
    builder.Configuration.AddJsonFile("secrets.json", optional: true);
    builder.Configuration.AddUserSecrets<Program>();
}

// CLOUD Production ONLY
var isAzure = !string.IsNullOrEmpty(Environment.GetEnvironmentVariable("WEBSITE_SITE_NAME"));

if (isAzure)
{
    var keyVaultEndpoint = builder.Configuration["AzureKeyVault:BaseUrl"];

    if (!string.IsNullOrEmpty(keyVaultEndpoint))
    {
        try
        {
            // Register SecretClient with DI (modern pattern)
            builder.Services.AddAzureClients(clientBuilder =>
            {
                clientBuilder.AddSecretClient(new Uri(keyVaultEndpoint));
                clientBuilder.UseCredential(new DefaultAzureCredential());
            });

            // Load secrets into IConfiguration (configuration source)
            builder.Configuration.AddAzureKeyVault(
                new Uri(keyVaultEndpoint),
                new DefaultAzureCredential());

            startupLogger.LogInformation("Key Vault connected: " + keyVaultEndpoint);
        }
        catch (Exception ex)
        {
            startupLogger.LogError(ex, "KeyVault initialization failed.");
        }
    }
}

var connectionString = builder.Configuration.GetConnectionString("SegmentSniperConnectionString");

builder.Services.AddDbContext<SegmentSniperDbContext>(options =>
    options.UseSqlServer(connectionString,
        b => b.MigrationsAssembly("SegmentSniper.Data"))
);

builder.Services.AddScoped<ISegmentSniperDbContext>(provider =>
    provider.GetRequiredService<SegmentSniperDbContext>());

builder.Build().Run();
