namespace SegmentSniper.ApplicationLogic.ActionHandlers.Authentication
{
    public interface IResetPasswordActionHandler
    {
        Task<ResetPasswordRequest.Response> HandleAsync(ResetPasswordRequest request);
    }

    public class ResetPasswordRequest
    {
        public ResetPasswordRequest(string userId, string passwordResetToken, string newPassword)
        {
            UserId = userId;
            PasswordResetToken = passwordResetToken;
            NewPassword = newPassword;
        }

        public string UserId { get; set; }
        public string PasswordResetToken { get; }
        public string NewPassword { get; }
        public class Response
        {
            public Response(bool success)
            {
                Success = success;
            }

            public bool Success { get; }
        }
    }
}