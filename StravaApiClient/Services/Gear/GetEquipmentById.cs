
using StravaApiClient.Models.Misc;

namespace StravaApiClient.Services.Gear
{
    public class GetEquipmentById : IGetEquipmentById
    {
        private readonly IStravaRequestClient _stravaRequestClient;

        public GetEquipmentById(IStravaRequestClient stravaRequestClient)
        {
            _stravaRequestClient = stravaRequestClient;
        }

        public async Task<GetGearByIdContract.Result> ExecuteAsync(GetGearByIdContract contract)
        {
            ValidateContract(contract);

            var apiResponse = await _stravaRequestClient.GetAsync<DetailedGearApiModel>($"gear/{contract.GearId}");
            return new GetGearByIdContract.Result { DetailedGearApiModel = apiResponse };
        }

        private void ValidateContract(GetGearByIdContract contract)
        {
            if (contract == null) throw new ArgumentNullException(nameof(contract));
            if (contract.GearId == null) throw new ArgumentException("Segment Id must be provided", nameof(contract.GearId));
        }
    }
}
