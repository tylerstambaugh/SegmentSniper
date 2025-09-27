
namespace SegmentSniper.Services.Garage.Equipment
{
    public interface IUpdateEquipmentMileage
    {
        Task ExecuteAsync(UpdateEquipmentMileageContract contract);
    }

    public class UpdateEquipmentMileageContract
    {
        public string UserId { get; set; }
        public int BikeId { get; set; }
        public string EquipmentId { get; set; }        
    }
}