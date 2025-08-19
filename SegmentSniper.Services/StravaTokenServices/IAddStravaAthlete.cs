namespace SegmentSniper.Services.StravaTokenServices
{
    public interface IAddStravaAthlete
    {
        Task<AddStravaAthleteContract.Result> ExecuteAsync(AddStravaAthleteContract contract);
    }

    public class AddStravaAthleteContract
    {
        public AddStravaAthleteContract(string userId, int stravaAthleteId)
        {
            UserId = userId;
            StravaAthlete = stravaAthleteId;
        }
        public string UserId { get; }
        public int StravaAthlete { get; }
        public class Result
        {
        }
    }
}