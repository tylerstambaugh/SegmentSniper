using StravaApiClient.Models.Misc;

namespace StravaApiClient.Services.Gear
{
    public interface IGetGearById
    {
        Task<GetGearByIdContract.Result> ExecuteAsync(GetGearByIdContract contract);
    }

    public class GetGearByIdContract
    {
        public GetGearByIdContract(string gearId)
        {
            GearId = gearId;
        }

        public string GearId { get; init; }
        public class Result
        {
            public required DetailedGearApiModel DetailedGearApiModel { get; init; }
        }
    }
}