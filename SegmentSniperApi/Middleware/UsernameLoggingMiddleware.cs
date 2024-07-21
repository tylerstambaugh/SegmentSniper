using Serilog.Context;
using System.Security.Claims;

public class UsernameLoggingMiddleware
{
    private readonly RequestDelegate _next;

    public UsernameLoggingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var userId = context.User?.FindFirst("sub")?.Value ?? "Anonymous";

        using (LogContext.PushProperty("UserId", userId))
        {
            await _next(context);
        }
    }
}