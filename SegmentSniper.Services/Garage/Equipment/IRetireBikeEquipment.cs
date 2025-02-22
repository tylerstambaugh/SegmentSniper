using SegmentSniper.Models.Models.Garage;

namespace SegmentSniper.Services.Garage.Equipment
{
    public interface IRetireBikeEquipment
    {
        Task<RetireBikeEquipmentContract.Result> ExecuteAsync(RetireBikeEquipmentContract contract);
    }

    public class RetireBikeEquipmentContract
    {
        public string UserId { get; set; }
        public string BikeId { get; set; }
        public DateTime RetireDate { get; set; }
        public string EquipmentId { get; set; }
        public class Result
        {
            public BikeModel BikeModel { get; set; }
        }
    }
}