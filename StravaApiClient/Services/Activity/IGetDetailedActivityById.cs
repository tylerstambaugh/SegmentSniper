using StravaApiClient.Models.Activity;

namespace StravaApiClient.Services.Activity
{
    public interface IGetDetailedActivityById
    {
        Task<GetDetailedActivityByIdContract.Result> ExecuteAsync(GetDetailedActivityByIdContract contract);

    }
    public class GetDetailedActivityByIdContract
    {
        public GetDetailedActivityByIdContract(string activityId)
        {
            ActivityId = activityId;
        }

        public string ActivityId { get; }

        public class Result
        {
            public DetailedActivityApiModel DetailedActivity { get; set; }
        }

    }
}