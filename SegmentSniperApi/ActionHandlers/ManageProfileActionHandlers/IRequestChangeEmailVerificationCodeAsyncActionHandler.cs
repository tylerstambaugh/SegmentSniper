namespace SegmentSniper.Api.ActionHandlers.ManageProfileActionHandlers
{
    public interface IRequestChangeEmailVerificationCodeAsyncActionHandler
    {
        Task<RequestChangeEmailVerificationCodeActionHandlerRequest.Response> HandleAsync(RequestChangeEmailVerificationCodeActionHandlerRequest request);
    }

    public class RequestChangeEmailVerificationCodeActionHandlerRequest
    {
        public string UserId { get; set; }
        public class Response
        {
            public bool Success { get; set; }
        }
    }
}