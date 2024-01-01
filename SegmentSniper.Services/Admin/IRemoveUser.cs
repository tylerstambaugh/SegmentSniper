namespace SegmentSniper.Services.Admin
{
    public interface IRemoveUser
    {
        Task<RemoveUserContract.Result> ExecuteAsync(RemoveUserContract contract);
    }

    public class RemoveUserContract
    {
        public RemoveUserContract(string userId)
        {
            UserId = userId;
        }

        public string UserId { get; set; }
        public class Result
        {
            public bool Success { get; set; }   
        }
    }
}