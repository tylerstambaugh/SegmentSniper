using Azure.Identity;
using Microsoft.Azure.Functions.Worker;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SegmentSniper.Data;
using Serilog;
using Serilog.Sinks.MSSqlServer;

var host = new HostBuilder()
    .ConfigureFunctionsWebApplication()
    .ConfigureAppConfiguration((context, config) =>
    {
        // Instead of building the whole config, we just pull what we need 
        // directly from the environment or existing providers.
        var isAzure = !string.IsNullOrEmpty(Environment.GetEnvironmentVariable("WEBSITE_SITE_NAME"));

        if (isAzure)
        {
            // IMPORTANT: Build a mini-config to get ONLY the endpoint/ID
            
            var partialConfig = config.Build();
            var keyVaultEndpoint = partialConfig["AzureKeyVault:BaseUrl"];
            var uamiClientId = partialConfig["AZURE_CLIENT_ID"];

            if (!string.IsNullOrEmpty(keyVaultEndpoint))
            {
                var options = new DefaultAzureCredentialOptions();
                if (!string.IsNullOrEmpty(uamiClientId))
                {
                    options.ManagedIdentityClientId = uamiClientId;
                }

                // Add Key Vault using the credential
                config.AddAzureKeyVault(new Uri(keyVaultEndpoint), new DefaultAzureCredential(options));
            }
        }
        else
        {
            config.AddUserSecrets<Program>(optional: true);
        }
    })
    .ConfigureServices((context, services) =>
    {
        services.AddApplicationInsightsTelemetryWorkerService();
        services.ConfigureFunctionsApplicationInsights();

        // Use the context.Configuration (which is now fully built by the host)
        var connectionString = context.Configuration.GetConnectionString("SegmentSniperConnectionString");

        services.AddDbContext<SegmentSniperDbContext>(options =>
            options.UseSqlServer(connectionString,
                b => b.MigrationsAssembly("SegmentSniper.Data"))
        );

        services.AddScoped<ISegmentSniperDbContext>(provider =>
            provider.GetRequiredService<SegmentSniperDbContext>());
    })
    .ConfigureLogging((context, logging) =>
    {
        // 2. Build the Serilog configuration
        // Grab the connection string that was loaded during ConfigureAppConfiguration
        var connectionString = context.Configuration.GetConnectionString("SegmentSniperConnectionString");

        var loggerConfig = new LoggerConfiguration()
            .ReadFrom.Configuration(context.Configuration)
            .Enrich.FromLogContext()
            .WriteTo.MSSqlServer(
                connectionString: connectionString,
                sinkOptions: new MSSqlServerSinkOptions
                {
                    TableName = "SegmentSniperLog",
                    AutoCreateSqlTable = false
                })
            .WriteTo.Console() // Always good for local debugging
            .MinimumLevel.Debug()
            .CreateLogger();

        // 3. Clear default providers if you want Serilog to be the source of truth
        logging.ClearProviders();

        // 4. Add Serilog to the Functions Logging pipeline
        logging.AddSerilog(loggerConfig, dispose: true);
    })
    .Build();

await host.RunAsync();