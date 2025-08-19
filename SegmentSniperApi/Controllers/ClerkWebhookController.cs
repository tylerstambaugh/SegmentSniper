using Clerk.Net.Client;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("clerk/webhook")]
public class ClerkWebhookController : ControllerBase
{
    private readonly ClerkApiClient _clerk;
    private readonly IConfiguration _configuration;

    public ClerkWebhookController(IConfiguration configuration)
    {
        _configuration = configuration;
        var clerkSecretKey = _configuration.GetValue<string>("Clerk:SecretKey");
    }

    [HttpPost]
    public async Task<IActionResult> Handle([FromBody] dynamic payload)
    {
        var userId = (string)payload.data.id;

        await _clerk.Users.(userId, new UserUpdate
        {
            PublicMetadata = new Dictionary<string, object>
            {
                { "roles", new[] { "member" } }
            }
        });

        return Ok();
    }
}
