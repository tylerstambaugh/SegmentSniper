using Azure.Identity;
using Azure.Extensions.AspNetCore.Configuration.Secrets;
using Microsoft.Azure.Functions.Worker.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data;

var builder = FunctionsApplication.CreateBuilder(args);

builder.ConfigureFunctionsWebApplication();

// Application Insights isn't enabled by default. See https://aka.ms/AAt8mw4.
// builder.Services
//     .AddApplicationInsightsTelemetryWorkerService()
//     .ConfigureFunctionsApplicationInsights();

string environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development";
builder.Configuration.AddJsonFile($"appsettings.{environment}.json", optional: false);

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
    if (!string.IsNullOrEmpty(keyVaultEndpoint))
    {
        builder.Configuration.AddAzureKeyVault(new Uri(keyVaultEndpoint), new DefaultAzureCredential());
    }
}

var connectionString = builder.Configuration.GetConnectionString("SegmentSniperConnectionString");

builder.Services.AddDbContext<SegmentSniperDbContext>(options =>
          options.UseSqlServer(connectionString,
                  b => b.MigrationsAssembly("SegmentSniper.Data"))
);

builder.Services.AddScoped<ISegmentSniperDbContext>(provider => provider.GetService<SegmentSniperDbContext>());

builder.Build().Run();
