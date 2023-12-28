namespace SegmentSniper.Services.AuthServices.Token
{
    public interface IRevokeToken
    {
        Task<RevokeTokenContract.Result> ExecuteSingleUser(RevokeTokenContract contract);
        Task<bool> ExecuteAllUsers();
    }

    public class RevokeTokenContract
    {
        public RevokeTokenContract(string userId)
        {
            UserId = userId;
        }

        public string UserId { get; }

        public class Result
        {            
            public bool Success { get; set; }
        }
    }
}