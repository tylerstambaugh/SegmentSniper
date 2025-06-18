using SegmentSniper.Models.Models.Strava.Token;

namespace SegmentSniper.Services.StravaTokenServices
{
    public interface IAddStravaToken
    {
         Task<AddStravaTokenContract.Result> ExecuteAsync(AddStravaTokenContract contract);

    }
    public class AddStravaTokenContract
    {
        public AddStravaTokenContract(string userId, StravaTokenModel token)
        {
            UserId = userId;
            Token = token;
        }
        public string UserId { get; set; }
        public StravaTokenModel Token { get; set; }
        public class Result
        {
            public Result(bool success)
            {
                Success = success;
            }
            public bool Success { get; set; }
        }
    }

}
