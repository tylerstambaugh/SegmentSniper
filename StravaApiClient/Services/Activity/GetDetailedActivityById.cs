using StravaApiClient.Models.Activity;
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

            var apiResponse =  await _stravaRequestClient.GetAsync<DetailedActivityApiModel>($"activities/{contract.ActivityId}");

            return new GetDetailedActivityByIdContract.Result()
            {
                DetailedActivity = apiResponse
            };
        }

        public void ValidateContract(GetDetailedActivityByIdContract contract)
        {
            if (contract == null) throw new ArgumentNullException(nameof(contract));
            
            if (contract.ActivityId == null) throw new ArgumentNullException($"{nameof(contract.ActivityId)}");
        }
    }


}
