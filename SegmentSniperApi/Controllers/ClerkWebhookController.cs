using Clerk.Net.Client;
using Clerk.Net.Client.Users.Item;
using Microsoft.AspNetCore.Mvc;
using SegmentSniper.ApplicationLogic.ActionHandlers.User;

[ApiController]
[Route("clerk/webhook")]
public class ClerkWebhookController : ControllerBase
{
    private readonly ClerkApiClient _clerk;
    private readonly IAddAppUserActionHandler _addAppUserActionHandler;

    public ClerkWebhookController(ClerkApiClient clerk, IAddAppUserActionHandler addAppUserActionHandler)
    {
        _clerk = clerk;
        _addAppUserActionHandler = addAppUserActionHandler;
    }

    [HttpPost]
    public async Task<IActionResult> Handle([FromBody] dynamic payload)
    {
        var evt = (string)payload.type;
        var userId = (string)payload.data.id;

        if (evt == "user.created")
        {
            try
            {
                var body = new WithUser_PatchRequestBody
                {
                    PublicMetadata = new WithUser_PatchRequestBody_public_metadata
                    {
                        AdditionalData = new Dictionary<string, object>
                        {
                            { "roles", new[] { "member" } }
                        }
                    }
                };

                await _clerk.Users[userId].PatchAsync(body);

                await _addAppUserActionHandler.HandleAsync(new AddAppUserRequest(userId));

            }
            catch (Exception ex)
            {
                // Log the exception (you can use a logging framework here)
                Console.WriteLine($"Error updating user metadata: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        return Ok();
    }
}
