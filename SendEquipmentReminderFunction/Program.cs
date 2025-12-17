using Azure.Identity;
using Microsoft.Azure.Functions.Worker;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SegmentSniper.Data;
using SegmentSniper.Services.Common;
using Serilog;
using Serilog.Sinks.MSSqlServer;

var host = new HostBuilder()
    // 1. Configure the Worker to use ASP.NET Core Integration
    .ConfigureFunctionsWebApplication()
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

        services.AddScoped<ISendEmail, SendEmail>();
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

// Required for UserSecrets
public partial class Program { }