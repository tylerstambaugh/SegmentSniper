using Azure.Identity;
using Microsoft.Azure.Functions.Worker;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SegmentSniper.Data;

var host = new HostBuilder()
    // 1. Configure the Worker to use ASP.NET Core Integration
    .ConfigureFunctionsWebApplication()

    // 2. Configure App Configuration (Key Vault & Secrets)
    .ConfigureAppConfiguration((context, config) =>
    {
        var settings = config.Build();
        var isAzure = !string.IsNullOrEmpty(Environment.GetEnvironmentVariable("WEBSITE_SITE_NAME"));

        if (isAzure)
        {
            var keyVaultEndpoint = settings["AzureKeyVault:BaseUrl"];
            var uamiClientId = settings["AZURE_CLIENT_ID"];

            if (!string.IsNullOrEmpty(keyVaultEndpoint) && !string.IsNullOrEmpty(uamiClientId))
            {
                var credential = new DefaultAzureCredential(
                    new DefaultAzureCredentialOptions { ManagedIdentityClientId = uamiClientId });
                config.AddAzureKeyVault(new Uri(keyVaultEndpoint), credential);
            }
        }
        else
        {
            config.AddUserSecrets<Program>(optional: true);
        }
    })

    // 3. Configure Services (DI)
    .ConfigureServices((context, services) =>
    {
        // Application Insights
        services.AddApplicationInsightsTelemetryWorkerService();
        services.ConfigureFunctionsApplicationInsights();

        // Database Context
        var connectionString = context.Configuration.GetConnectionString("SegmentSniperConnectionString");
        services.AddDbContext<SegmentSniperDbContext>(options =>
            options.UseSqlServer(connectionString,
                b => b.MigrationsAssembly("SegmentSniper.Data"))
        );

        services.AddScoped<ISegmentSniperDbContext>(provider =>
            provider.GetRequiredService<SegmentSniperDbContext>());

    })

    // 4. Configure Logging
    .ConfigureLogging(logging =>
    {
        logging.AddConsole();
        logging.SetMinimumLevel(LogLevel.Debug);
    })
    .Build();

await host.RunAsync();

// Required for UserSecrets
public partial class Program { }