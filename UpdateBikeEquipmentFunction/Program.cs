using Azure.Identity;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SegmentSniper.Data;

var builder = FunctionsApplication.CreateBuilder(args);

// 1. Basic Logging
builder.Logging.AddConsole();
builder.Logging.SetMinimumLevel(LogLevel.Debug);

// 2. Application Insights
builder.ConfigureFunctionsWebApplication();
builder.Services
    .AddApplicationInsightsTelemetryWorkerService()
    .ConfigureFunctionsApplicationInsights();

// 3. Key Vault (Cloud Only)
// Note: builder.Configuration is already populated with appsettings/env vars here.
var isAzure = !string.IsNullOrEmpty(Environment.GetEnvironmentVariable("WEBSITE_SITE_NAME"));

if (isAzure)
{
    var keyVaultEndpoint = builder.Configuration["AzureKeyVault:BaseUrl"];
    var uamiClientId = builder.Configuration["AZURE_CLIENT_ID"];

    if (!string.IsNullOrEmpty(keyVaultEndpoint) && !string.IsNullOrEmpty(uamiClientId))
    {
        try
        {
            var credential = new DefaultAzureCredential(
                new DefaultAzureCredentialOptions { ManagedIdentityClientId = uamiClientId });

            builder.Configuration.AddAzureKeyVault(new Uri(keyVaultEndpoint), credential);
        }
        catch (Exception ex)
        {
            // Using a temporary logger since the host isn't built yet
            var logger = LoggerFactory.Create(l => l.AddConsole()).CreateLogger("Startup");
            logger.LogError(ex, "KeyVault initialization failed.");
        }
    }
}
else
{
    // Explicitly add UserSecrets if they aren't loading automatically
    builder.Configuration.AddUserSecrets<Program>();
}

// 4. Database Context
var connectionString = builder.Configuration.GetConnectionString("SegmentSniperConnectionString");

builder.Services.AddDbContext<SegmentSniperDbContext>(options =>
    options.UseSqlServer(connectionString,
        b => b.MigrationsAssembly("SegmentSniper.Data"))
);

builder.Services.AddScoped<ISegmentSniperDbContext>(provider =>
    provider.GetRequiredService<SegmentSniperDbContext>());

builder.Build().Run();

// Required for UserSecrets to find "Program" in top-level statements
public partial class Program { }