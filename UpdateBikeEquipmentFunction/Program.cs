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
        var isAzure = !string.IsNullOrEmpty(Environment.GetEnvironmentVariable("WEBSITE_SITE_NAME"));

        if (isAzure)
        {
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
        var loggerConfig = new LoggerConfiguration()
            .ReadFrom.Configuration(context.Configuration)
            .Enrich.FromLogContext()
            .WriteTo.Console()
            .MinimumLevel.Debug();

        var connectionString =
            context.Configuration.GetConnectionString("SegmentSniperConnectionString");

        if (!string.IsNullOrWhiteSpace(connectionString))
        {
            loggerConfig.WriteTo.MSSqlServer(
                connectionString,
                new MSSqlServerSinkOptions
                {
                    TableName = "SegmentSniperLog",
                    AutoCreateSqlTable = false
                });
        }

        Log.Logger = loggerConfig.CreateLogger();

        logging.ClearProviders();
        logging.AddSerilog(Log.Logger, dispose: true);
    })

    .Build();

await host.RunAsync();