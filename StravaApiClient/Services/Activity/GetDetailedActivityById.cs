namespace StravaApiClient.Services.Activity
{
    public class GetDetailedActivityById : IGetDetailedActivityById
    {
        private readonly IStravaRequestClient _stravaRequestClient;

        public GetDetailedActivityById(IStravaRequestClient stravaRequestClient)
        {
            _stravaRequestClient = stravaRequestClient;
        }

        public async Task<GetDetailedActivityByIdContract.Result> ExecuteAsync(GetDetailedActivityByIdContract contract)
        {

        }
    }


}
