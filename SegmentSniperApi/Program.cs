using log4net;
using log4net.Config;
using log4net.Repository;
using log4net.Repository.Hierarchy;
using Microsoft.AspNetCore.Diagnostics;
using SegmentSniper.Api.Configuration;
using SegmentSniper.Api.Logging;
using SegmentSniper.Data;
using System.Net;
using System.Reflection;

var configuration = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json")
    .AddUserSecrets(Assembly.GetExecutingAssembly(), true)
    .AddEnvironmentVariables()
    .Build();

var builder = await WebApplicationBuilderConfig.ConfigureBuilder(configuration);

var app = builder.Build();

// Enable log4net internal debugging
log4net.Util.LogLog.InternalDebugging = true;

// Configure log4net
var logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));

// Create a scope to resolve the EfCoreAppender
using (var scope = app.Services.CreateScope())
{
    var efCoreAppender = scope.ServiceProvider.GetRequiredService<EfCoreAppender>();

    // Add the EfCoreAppender to the logger repository
    var hierarchy = (Hierarchy)logRepository;
    hierarchy.Root.AddAppender(efCoreAppender);
    hierarchy.Configured = true;
}

// Configure the application
Configure(app, app.Environment, app.Services.GetRequiredService<Microsoft.Extensions.Logging.ILoggerFactory>());

await SeedData.Initialize(app.Services, configuration);
app.Run();


void Configure(WebApplication app, IWebHostEnvironment env, Microsoft.Extensions.Logging.ILoggerFactory loggerFactory)
{
    // Create a scope to resolve the SegmentSniperDbContext
    using (var scope = app.Services.CreateScope())
    {
        var context = scope.ServiceProvider.GetRequiredService<SegmentSniperDbContext>();

        // Ensure database is created
        context.Database.EnsureCreated();
    }

    loggerFactory.AddLog4Net("log4net.config");

    
    var testLogger = loggerFactory.CreateLogger("test Logger");


    testLogger.LogInformation("This is a test log message.");

    // Configure the HTTP request pipeline
    
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
        app.UseSwagger();
        app.UseSwaggerUI();
    }
    else
    {
        app.UseExceptionHandler("/Home/Error");
        app.UseHsts();
    }

    app.UseHttpsRedirection();
    app.UseStaticFiles();
    app.UseRouting();
    app.UseCors("AllowReactApp");

    app.UseIdentityServer();
    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();

    if (env.IsDevelopment())
    {
        app.UseExceptionHandler(
            options =>
            {
                options.Run(async context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    context.Response.ContentType = "text/html";
                    var ex = context.Features.Get<IExceptionHandlerFeature>();
                    if (ex != null)
                    {
                        var err = $"<h1>Error: {ex.Error.Message}</h1>{ex.Error.StackTrace}";
                        await context.Response.WriteAsync(err).ConfigureAwait(false);
                    }
                });
            }
        );
    }
}
