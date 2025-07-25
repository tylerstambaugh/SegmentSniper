﻿using Newtonsoft.Json;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.Authentication
{
    public interface ISendResetPasswordEmailActionHandler
    {
        Task<SendResetPasswordEmailRequest.Response> HandleAsync(SendResetPasswordEmailRequest request);
    }

    public class SendResetPasswordEmailRequest
    {

        public SendResetPasswordEmailRequest(string emailAddress)
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