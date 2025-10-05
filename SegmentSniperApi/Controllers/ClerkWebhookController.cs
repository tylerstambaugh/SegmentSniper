using Clerk.Net.Client;
using Clerk.Net.Client.Users.Item;
using GraphQL;
using Microsoft.AspNetCore.Mvc;
using SegmentSniper.ApplicationLogic.ActionHandlers.User;
using Serilog;
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

    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Handle([FromBody] ClerkEvent<ClerkUser> payload)
    {
        var evt = payload.Type;
        var user = payload.Data;
        Log.Debug($"Clerk webhook event received: ${payload}");

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

                    Log.Debug($"Clerk update request: ${body}");
                    var clerkUpdateResponse = await _clerk.Users[user.Id].PatchAsync(body);
                    Log.Debug($"Clerk update response: ${clerkUpdateResponse}");
                }

                var addUserResponse = await _addAppUserActionHandler.HandleAsync(new AddAppUserRequest(user.Id));

                if(addUserResponse.Success)
                    return Ok();

                return StatusCode(502, "addUserResponse.Success was false");
            }
            catch (Exception ex)
            {
                Log.Debug($"Error adding user: {ex.Message}");
                return StatusCode(501, $"Internal server error: ${ex.Message}");
            }
        }

        if(evt == "user.updated")
        {
            try
            {
                //need to process the update and
                //add roles to the user etc.
            }
            catch(Exception ex)
            {
                Log.Debug($"Error updating user: {ex.Message}");
                return StatusCode(501, $"Internal server error: ${ex.Message}");
            }
        }

        return Ok();
    }

    public class ClerkEvent<T>
    {
        public string Object { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public long Timestamp { get; set; }

        [JsonPropertyName("instance_id")]
        public string Instance_Id { get; set; } = string.Empty;

        [JsonPropertyName("data")]
        public T Data { get; set; }

        [JsonPropertyName("event_attributes")]
        public Dictionary<string, object>? Event_Attributes { get; set; }
    }

    public class ClerkUser
    {
        public string Id { get; set; } = string.Empty;
        public string Object { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;

        [JsonPropertyName("email_addresses")]
        public List<ClerkEmailAddress> EmailAddresses { get; set; } = new();

        [JsonPropertyName("public_metadata")]
        public Dictionary<string, object> PublicMetadata { get; set; } = new();
    }

    public class ClerkEmailAddress
    {
        [JsonPropertyName("email_address")]
        public string EmailAddress { get; set; } = string.Empty;
    }
}
