using SegmentSniper.Services.AuthServices;

namespace SegmentSniper.Api.ActionHandlers.AuthActionHandlers
{
    public class ResetPasswordActionHandler : IResetPasswordActionHandler
    {
        private readonly IResetPassword _resetPassword;

        public ResetPasswordActionHandler(IResetPassword resetPassword)
        {
            _resetPassword = resetPassword;
        }

        public async Task<PasswordResetRequest.Response> HandleAsync(PasswordResetRequest request)
        {
            throw new NotImplementedException();
        }
    }
}
