

using Microsoft.AspNetCore.Diagnostics;
using SegmentSniper.Api.Helpers;
using System.Configuration;
using System.Net;

var configuration = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json")
    .Build();

var builder = WebApplicationBuilderConfig.ConfigureBuilder(configuration);

var app = builder.Build();
// Add services to the container.


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();

app.UseIdentityServer();



app.UseAuthorization();

app.UseSwagger();

app.UseSwaggerUI();

app.MapControllers();
//app.MapControllerRoute(
//    name: "default",
//    pattern: "api/");

app.UseExceptionHandler(
 options => {
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

app.Run();
