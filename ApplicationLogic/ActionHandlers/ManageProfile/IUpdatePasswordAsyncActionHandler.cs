namespace SegmentSniper.ApplicationLogic.ActionHandlers.ManageProfile
{
    public interface IUpdatePasswordAsyncActionHandler
    {
        Task<UpdatePasswordRequest.Response> HandleAsync(UpdatePasswordRequest request);
    }

    public class UpdatePasswordRequest
    {
        public UpdatePasswordRequest(string currentPassword, string newPassword)
        {
            CurrentPassword = currentPassword;
            NewPassword = newPassword;
        }

        public string? UserId { get; set; }
        public string CurrentPassword { get;}
        public string NewPassword { get; }

        public class Response
        {            
            public bool Success { get; set; }
        }
    }
}