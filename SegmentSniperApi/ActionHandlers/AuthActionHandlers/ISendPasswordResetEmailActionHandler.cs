using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace SegmentSniper.Api.ActionHandlers.AuthActionHandlers
{
    public interface ISendPasswordResetEmailActionHandler
    {
        Task<SendPasswordResetEmailRequest.Response> HandleAsync(SendPasswordResetEmailRequest request);
    }

    public class SendPasswordResetEmailRequest
    {

        public SendPasswordResetEmailRequest()
        {

        }
        public SendPasswordResetEmailRequest(string emailAddress)
        {
            EmailAddress = emailAddress;
        }

        [JsonProperty("emailAddress")]
        public string EmailAddress { get; }

        public class Response
        {
            public bool Success { get; set; }
        }
    }
}