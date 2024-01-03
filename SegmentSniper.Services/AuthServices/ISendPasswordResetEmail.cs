namespace SegmentSniper.Services.AuthServices
{
    public interface ISendPasswordResetEmail
    {
        Task<SendChangePasswordEmailContract.Result> Execute(SendChangePasswordEmailContract contract);
    }

    public class SendChangePasswordEmailContract
    {
        public SendChangePasswordEmailContract(string userId, string accessToken, string refreshToken)
        {
            UserId = userId;
            AccessToken = accessToken;
            RefreshToken = refreshToken;
        }

        public string UserId { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public class Result
        {
            public bool Success { get; set; }
        }
    }
}