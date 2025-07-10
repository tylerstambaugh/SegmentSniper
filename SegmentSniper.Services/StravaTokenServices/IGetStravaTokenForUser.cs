using SegmentSniper.Models.Models.Strava.Token;

namespace SegmentSniper.Services.StravaToken
{
    public interface IGetStravaTokenForUser
    {
       Task<GetStravaTokenForUserContract.Result> ExecuteAsync(GetStravaTokenForUserContract contract);
    }

    public class GetStravaTokenForUserContract
    {
        public GetStravaTokenForUserContract(string userId)
        {
            UserId = userId;
        }

        public string UserId { get; }

        public class Result
        {
            public StravaTokenModel StravaToken { get; set; }
        }
    }
}