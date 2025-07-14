using Duende.IdentityServer.Models;

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
            public Result(string userId, string userName, string errorMessage)
            {
                UserId = userId;
                UserName = userName;
                ErrorMessage = errorMessage;
            }
            public string ErrorMessage { get; set; }
            public string UserId { get; set; }
            public string UserName { get; set; }
        }
    }
}