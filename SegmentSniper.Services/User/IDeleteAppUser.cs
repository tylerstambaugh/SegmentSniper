namespace SegmentSniper.Services.User
{
    public interface IDeleteAppUser
    {
        Task<DeleteAppUserContract.Result> ExecuteAsync(DeleteAppUserContract contract);
    }

    public class DeleteAppUserContract
    {
        public DeleteAppUserContract(string authUserId)
        {
            AuthUserId = authUserId;
        }
        public string AuthUserId { get;  }
        public class Result
        {           
            public Result(bool success, string message = null)
            {
                Success = success;
                Message = message;
            }
            public bool Success { get; set; }
            public string Message { get; set; }
        }
    }
}