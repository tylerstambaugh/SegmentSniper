using SegmentSniper.Models.Models.Garage;

namespace SegmentSniper.Services.Garage
{
    public interface IUpsertBikeEquipment
    {
        Task<UpsertBikeEquipmentContract.Result> ExecuteAsync(UpsertBikeEquipmentContract contract);
    }

    public class UpsertBikeEquipmentContract
    {
        public string UserId { get; set; }
        public string BikeId { get; set; }
        public EquipmentModel Equipment { get; set; }
        public class Result
        {
            public BikeModel BikeModel { get; set; }
        }
    }
}