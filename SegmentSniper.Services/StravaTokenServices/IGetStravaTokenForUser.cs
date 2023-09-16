using SegmentSniper.Data.Entities.StravaToken;

namespace SegmentSniper.Services.StravaToken
{
    public interface IGetStravaTokenForUser
    {
        GetStravaTokenForUserContract.Result Execute(GetStravaTokenForUserContract contract);
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
            public SegmentSniper.Data.Entities.StravaToken.StravaToken? StravaToken { get; set; }
        }
    }
}