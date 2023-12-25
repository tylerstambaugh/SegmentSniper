namespace SegmentSniper.Services.AuthServices.Token
{
    public interface IRevokeToken
    {
        Task<RevokeTokenContract.Result> ExecuteSingleUser(RevokeTokenContract contract);
        Task<bool> ExecuteAllUsers();
    }

    public class RevokeTokenContract
    {
        public RevokeTokenContract(string userName)
        {
            UserName = userName;
        }

        public string UserName { get; }

        public class Result
        {            
            public bool Success { get; set; }
        }
    }
}