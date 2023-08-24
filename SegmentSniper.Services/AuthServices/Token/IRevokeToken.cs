namespace SegmentSniper.Services.AuthServices.Token
{
    public interface IRevokeToken
    {
        Task<RevokeTokenContract.Result> Execute(RevokeTokenContract contract);
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