using Microsoft.AspNetCore.Diagnostics;
using SegmentSniper.Api.Configuration;
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

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();
app.UseCors("AllowReactApp");

app.UseIdentityServer();

app.UseAuthentication();
app.UseAuthorization();

app.UseSwagger();

app.UseSwaggerUI();

app.MapControllers();

if (app.Environment.IsDevelopment())
{
    app.UseExceptionHandler(
     options =>
     {
         options.Run(
         async context =>
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

await SeedData.Initialize(app.Services, configuration);
app.Run();

