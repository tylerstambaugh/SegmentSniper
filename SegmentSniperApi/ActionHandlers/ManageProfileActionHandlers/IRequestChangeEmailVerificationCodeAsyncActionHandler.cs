namespace SegmentSniper.Api.ActionHandlers.ManageProfileActionHandlers
{
    public interface IRequestChangeEmailVerificationCodeAsyncActionHandler
    {
        Task<RequestChangeEmailVerificationCodeActionHandlerRequest.Response> HandleAsync(RequestChangeEmailVerificationCodeActionHandlerRequest request);
    }

    public class RequestChangeEmailVerificationCodeActionHandlerRequest
    {
        public RequestChangeEmailVerificationCodeActionHandlerRequest(string userId)
        {
            UserId = userId;
        }

        public string UserId { get;  }
        
        public class Response
        {
            public bool Success { get; set; }
        }
    }
}