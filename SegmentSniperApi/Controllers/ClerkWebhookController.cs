using Clerk.Net.Client;
using Clerk.Net.Client.Users.Item;
using Microsoft.AspNetCore.Mvc;
using SegmentSniper.ApplicationLogic.ActionHandlers.User;
using System.Text.Json;
using System.Text.Json.Serialization;

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
    public async Task<IActionResult> Handle([FromBody] ClerkEvent<ClerkUser> payload)
    {
        var evt = payload.Type;
        var user = payload.Data;

        if (evt == "user.created")
        {
            try
            {
                if (!user.PublicMetadata.TryGetValue("roles", out var rolesObj) ||
                        rolesObj is not JsonElement rolesElement ||
                        !rolesElement.EnumerateArray().Any(r => r.GetString() == "member"))
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

                    var clerkUpdateResponse = await _clerk.Users[user.Id].PatchAsync(body);
                }

                var addUserResponse = await _addAppUserActionHandler.HandleAsync(new AddAppUserRequest(user.Id));

                if(addUserResponse.Success)
                    return Ok();

                return StatusCode(500, "Internal server error");
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

    public class ClerkEvent<T>
    {
        public string Object { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public long Timestamp { get; set; }
        public string Instance_Id { get; set; } = string.Empty;
        public T Data { get; set; }
        public Dictionary<string, object>? Event_Attributes { get; set; }
    }

    public class ClerkUser
    {
        public string Id { get; set; } = string.Empty;
        public string Object { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Email_Address { get; set; } = string.Empty;

        [JsonPropertyName("public_metadata")]
        public Dictionary<string, object> PublicMetadata { get; set; } = new();
    }

}
