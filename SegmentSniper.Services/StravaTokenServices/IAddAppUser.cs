namespace SegmentSniper.Services.StravaTokenServices
{
    public interface IAddAppUser
    {
        Task<AddAppUserContract.Result> ExecuteAsync(AddAppUserContract contract);
    }

    public class AddAppUserContract
    {
        public AddAppUserContract(string userId, long stravaAthleteId)
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