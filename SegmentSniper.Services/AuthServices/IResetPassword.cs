namespace SegmentSniper.Services.AuthServices
{
    public interface IResetPassword
    {
        Task<PasswordResetContract.Result> ExecuteAsync(PasswordResetContract contract);
    }

    public class PasswordResetContract
    {
        public PasswordResetContract(string userId, string changePasswordToken, string newPassword)
        {
            UserId = userId;
            ChangePasswordToken = changePasswordToken;
            NewPassword = newPassword;
        }

        public string UserId { get;  }
        public string ChangePasswordToken { get; }
        public string NewPassword { get;  }
        public class Result
        {
            public Result(bool success)
            {
                Success = success;
            }
            public bool Success { get; set; }
        }
    }
}