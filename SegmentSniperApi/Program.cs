

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http.Headers;
using Microsoft.Net.Http.Headers;
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

app.UseCors("AllowReactApp");

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.UseIdentityServer();


app.UseAuthentication();
app.UseAuthorization();

app.UseSwagger();

app.UseSwaggerUI();

app.MapControllers();
//app.MapControllerRoute(
//    name: "default",
//    pattern: "api/");

var spaPath = "/app";
if (app.Environment.IsDevelopment())
{
    app.MapWhen(y => y.Request.Path.StartsWithSegments(spaPath), client =>
    {
        client.UseSpa(spa =>
        {
            spa.UseProxyToSpaDevelopmentServer("https://localhost:6767");
        });
    });
}
else
{
    app.Map(new PathString(spaPath), client =>
    {
        client.UseSpaStaticFiles();
        client.UseSpa(spa => {
            spa.Options.SourcePath = "SegmentSniper.React";

            // adds no-store header to index page to prevent deployment issues (prevent linking to old .js files)
            // .js and other static resources are still cached by the browser
            spa.Options.DefaultPageStaticFileOptions = new StaticFileOptions
            {
                OnPrepareResponse = ctx =>
                {
                    ResponseHeaders headers = ctx.Context.Response.GetTypedHeaders();
                    headers.CacheControl = new CacheControlHeaderValue
                    {
                        NoCache = true,
                        NoStore = true,
                        MustRevalidate = true
                    };
                }
            };
        });
    });
}

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
