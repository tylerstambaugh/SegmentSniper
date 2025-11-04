namespace SegmentSniper.Services.User
{
    public interface IAddAppUser
    {
        Task<AddAppUserContract.Result> ExecuteAsync(AddAppUserContract contract);
    }

    public class AddAppUserContract
    {
        public AddAppUserContract(string userId, string? emailAddress)
        {
            UserId = userId;
            EmailAddress = emailAddress;
        }
        public string UserId { get; }
        public string? EmailAddress { get; }
        public class Result
        {
            public Result(bool success, string message = null)
            {
                Success = success;
                Message = message;
            }
            public bool Success { get; }
            public string Message { get; }
        }
            
    }
}