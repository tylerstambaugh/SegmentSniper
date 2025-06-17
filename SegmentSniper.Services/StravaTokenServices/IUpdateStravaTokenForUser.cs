using SegmentSniper.Models.Models.Strava.Token;

namespace SegmentSniper.Services.StravaTokenServices
{
    public interface IUpdateStravaTokenForUser
    {
        UpdateStravaTokenContract.Result Execute(UpdateStravaTokenContract contract);
    }

    public class UpdateStravaTokenContract
    {

        public StravaTokenModel StravaToken { get; set; }
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