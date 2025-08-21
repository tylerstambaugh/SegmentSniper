namespace SegmentSniper.Services.StravaTokenServices
{
    public interface IAddUser
    {
        Task<AddUserContract.Result> ExecuteAsync(AddUserContract contract);
    }

    public class AddUserContract
    {
        public AddUserContract(string userId, long stravaAthleteId)
        {
            UserId = userId;
            StravaAthleteId = stravaAthleteId;
        }
        public string UserId { get; }
        public long StravaAthleteId { get; }
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