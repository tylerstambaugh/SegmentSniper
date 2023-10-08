using StravaApiClient.Models.Segment;

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
            ValidateContract(contract);

            var apiResponse = _stravaRequestClient.GetAsync<DetailedSegmentApiModel>($"activities/{contract.ActivityId}");

            return new GetDetailedActivityByIdContract.Result()
            {
                DetailedActivity = apiResponse.Result
            };
        }

        public void ValidateContract(GetDetailedActivityByIdContract contract)
        {
            if (contract == null) throw new ArgumentNullException(nameof(contract));
            //add more validations
        }
    }


}
