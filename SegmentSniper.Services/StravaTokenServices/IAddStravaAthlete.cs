namespace SegmentSniper.Services.StravaTokenServices
{
    public interface IAddStravaAthlete
    {
        Task<AddStravaAthleteContract.Result> ExecuteAsync(AddStravaAthleteContract contract);
    }

    public class AddStravaAthleteContract
    {
        public AddStravaAthleteContract(string userId, long stravaAthleteId)
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