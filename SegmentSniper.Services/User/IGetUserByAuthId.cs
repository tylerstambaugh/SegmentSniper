namespace SegmentSniper.Services.User
{
    public interface IGetUserByAuthId
    {
        Task<GetUserByAuthIdContract.Result> ExecuteAsync(GetUserByAuthIdContract contract);
    }

    public class GetUserByAuthIdContract
    {
        public GetUserByAuthIdContract(string authUserId)
        {
            AuthUserId = authUserId;
        }
        public string AuthUserId { get; }
        public class Result
        {
            public Result()
            {
                UserId = userId;
                Message = message;
            }
            public Strava
    }
}