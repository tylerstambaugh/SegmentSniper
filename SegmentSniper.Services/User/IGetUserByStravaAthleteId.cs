namespace SegmentSniper.Services.User
{
    public interface IGetUserByStravaAthleteId
    {
        Task<GetUserByStravaAthleteIdContract.Result> ExecuteAsync(GetUserByStravaAthleteIdContract contract);
    }

    public class GetUserByStravaAthleteIdContract
    {
        public long StravaAthleteId { get; set; }
        public GetUserByStravaAthleteIdContract(long stravaAthleteId)
        {
            StravaAthleteId = stravaAthleteId;
        }
        public class Result
        {
            public Result(int userId, string errorMessage)
            {
                UserId = userId;
                ErrorMessage = errorMessage;
            }
            public string ErrorMessage { get; set; }
            public int UserId { get; set; }
        }
    }
}