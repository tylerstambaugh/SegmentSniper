using SegmentSniper.Services.AuthServices;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.Authentication
{
    public class ResetPasswordActionHandler : IResetPasswordActionHandler
    {
        private readonly IResetPassword _resetPassword;

        public ResetPasswordActionHandler(IResetPassword resetPassword)
        {
            _resetPassword = resetPassword;
        }

        public async Task<ResetPasswordRequest.Response> HandleAsync(ResetPasswordRequest request)
        {
            try
            {
                var result = await _resetPassword.ExecuteAsync(new PasswordResetContract(request.UserId, request.PasswordResetToken, request.NewPassword));

                return new ResetPasswordRequest.Response(result.Success);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error while resetting password:", ex);
            }
        }
    }
}
