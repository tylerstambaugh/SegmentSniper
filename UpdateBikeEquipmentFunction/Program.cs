using Azure.Extensions.AspNetCore.Configuration.Secrets;
using Azure.Identity;
using Microsoft.Azure.Functions.Worker.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SegmentSniper.Data;

var builder = FunctionsApplication.CreateBuilder(args);

builder.ConfigureFunctionsWebApplication();

// Application Insights isn't enabled by default. See https://aka.ms/AAt8mw4.
// builder.Services
//     .AddApplicationInsightsTelemetryWorkerService()
//     .ConfigureFunctionsApplicationInsights();

string environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development";
builder.Configuration
    .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();

if (builder.Environment.IsDevelopment())
{
    // In dev, also load from local secrets.json (or user secrets)
    var secretsFilePath = Path.Combine(builder.Environment.ContentRootPath, "secrets.json");
    builder.Configuration.AddJsonFile(secretsFilePath, optional: true);
}
else
{
    // Add Azure Key Vault in non-dev
    var keyVaultEndpoint = builder.Configuration["AzureKeyVault:BaseUrl"];
    Console.WriteLine("AzureKeyVault:BaseUrl: " + builder.Configuration["AzureKeyVault:BaseUrl"]);
    

    if (!string.IsNullOrEmpty(keyVaultEndpoint))
    {
        builder.Configuration.AddAzureKeyVault(new Uri(keyVaultEndpoint), new DefaultAzureCredential());
    }
}

//builder.Services.Configure<QueueSettings>(options =>
//{
//    // Pull the connection string (works in both local and Azure)
//    options.ConnectionString = builder.Configuration["ConnectionStrings:SegmentSniperDevQueueConnection"]
//                               ?? builder.Configuration["SegmentSniperDevQueueConnection"];
//    Console.WriteLine("function Queue Connection String: " + builder.Configuration["ConnectionStrings:SegmentSniperDevQueueConnection"]);

//    // Set the queue name from your config (non-secret)
//    options.QueueName = builder.Configuration["AzureStorageQueue:QueueName"]
//                        ?? "process-bike-activity-queue";
//});

var connectionString = builder.Configuration.GetConnectionString("SegmentSniperConnectionString");

builder.Services.AddDbContext<SegmentSniperDbContext>(options =>
          options.UseSqlServer(connectionString,
                  b => b.MigrationsAssembly("SegmentSniper.Data"))
);

builder.Services.AddScoped<ISegmentSniperDbContext>(provider => provider.GetService<SegmentSniperDbContext>());

builder.Build().Run();
