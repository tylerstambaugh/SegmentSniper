using Duende.IdentityServer.Validation;

namespace SegmentSniper.Api.ActionHandlers.ManageProfileActionHandlers
{
    public class RequestChangeEmailVerificationCodeAsyncActionHandler : IRequestChangeEmailVerificationCodeAsyncActionHandler
    {
        public RequestChangeEmailVerificationCodeAsyncActionHandler()
        {

        }

        public async Task<RequestChangeEmailVerificationCodeActionHandlerRequest.Response> HandleAsync(RequestChangeEmailVerificationCodeActionHandlerRequest request)
        {
            ValidatedRequest(request);
        }

        private void ValidatedRequest(RequestChangeEmailVerificationCodeActionHandlerRequest request)
        {
            throw new NotImplementedException();
        }
    }
}
