using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using SegmentSniper.Api.Configuration;
using SegmentSniper.Data;
using System.Net;
using System.Reflection;

var configuration = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json")
    .AddUserSecrets(Assembly.GetExecutingAssembly(), true)
    .AddEnvironmentVariables()
    .Build();

var builder = WebApplicationBuilderConfig.ConfigureBuilder(configuration);

var app = builder.Build();

// Configure the application
Configure(app, app.Environment, app.Services.GetRequiredService<Microsoft.Extensions.Logging.ILoggerFactory>());

//await SeedData.Initialize(app.Services, configuration);
app.Run();


void Configure(WebApplication app, IWebHostEnvironment env, Microsoft.Extensions.Logging.ILoggerFactory loggerFactory)
{
    // Create a scope to resolve the SegmentSniperDbContext
    //using (var scope = app.Services.CreateScope())
    //{
    //    var context = scope.ServiceProvider.GetRequiredService<SegmentSniperDbContext>();
    //    context.Database.Migrate();

    //    // Ensure database is created
    //    //context.Database.EnsureCreated();
    //}


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

   //app.UseMiddleware<UsernameLoggingMiddleware>();

    app.UseHttpsRedirection();
    app.UseStaticFiles();
    app.UseRouting();

    app.UseCors("AllowReactApp");

    app.UseAuthentication();
    app.UseAuthorization();

    //app.UseEndpoints(endpoints =>
    //{
    //    endpoints.MapGraphQL("/graphql"); // Ensure the path matches your endpoint
    //});

    app.MapControllers();

    app.UseGraphQL();
    app.UseGraphQLGraphiQL("/graphiql");

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

