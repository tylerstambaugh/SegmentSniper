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
            try
            {
                var result = await _resetPassword.ExecuteAsync(new PasswordResetContract(request.UserId, request.PasswordResetToken, request.NewPassword));

                return new PasswordResetRequest.Response(result.Success);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error while resetting password:", ex);
            }
        }
    }
}
