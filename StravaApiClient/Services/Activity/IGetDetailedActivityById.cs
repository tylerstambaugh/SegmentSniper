namespace StravaApiClient.Services.Activity
{
    public interface IGetDetailedActivityById
    {
        Task<GetDetailedActivityByIdContract.Result> ExecuteAsync(GetDetailedActivityByIdContract contract);

    }
    public class GetDetailedActivityByIdContract
    {
        public GetDetailedActivityByIdContract()
        {

        }

        public string ActivityId { get; }

        public class Result
        {

        }

    }
}