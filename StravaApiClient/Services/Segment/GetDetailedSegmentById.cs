using StravaApiClient.Models.Segment;

namespace StravaApiClient.Services.Segment
{
    public class GetDetailedSegmentById : IGetDetailedSegmentById
    {
        private readonly IStravaRequestClient _stravaRequestClient;
        public GetDetailedSegmentById(IStravaRequestClient stravaRequestClient)
        {
            _stravaRequestClient = stravaRequestClient;
        }

        public async Task<GetDetailedSegmentByIdContract.Result> ExecuteAsync(GetDetailedSegmentByIdContract contract)
        {
            ValidateContract(contract);

            var apiResponse = _stravaRequestClient.GetAsync<DetailedSegmentApiModel>($"segment/{contract.SegmentId}");
            return new GetDetailedSegmentByIdContract.Result(apiResponse.Result);
        }

        private void ValidateContract(GetDetailedSegmentByIdContract contract)
        {
            if (contract == null) throw new ArgumentNullException(nameof(contract));
        }
    }
}
