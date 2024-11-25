using StravaApiClient.Models.Misc;

namespace StravaApiClient.Services.Gear
{
    public interface IGetEquipmentById
    {
        Task<GetGearByIdContract.Result> ExecuteAsync(GetGearByIdContract contract);
    }

    public class GetGearByIdContract
    {

        public int GearId { get; init; }
        public class Result
        {
            public required DetailedGearApiModel DetailedGearApiModel { get; init; }
        }
    }
}