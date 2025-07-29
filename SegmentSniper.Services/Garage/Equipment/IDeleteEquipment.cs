using SegmentSniper.Models.Models.Garage;

namespace SegmentSniper.Services.Garage.Equipment
{
    public interface IDeleteEquipment
    {
        Task<DeleteEquipmentContract.Result> ExecuteAsync(DeleteEquipmentContract contract);
        
    }

    public class DeleteEquipmentContract
    {
        public DeleteEquipmentContract(string userId, string equipmentId)
        {
            UserId = userId;
            EquipmentId = equipmentId;
        }

        public string UserId { get; set; }
        public string EquipmentId { get; set; }
        public class Result
        {
            public BikeModel Bike{ get; set; }
        }
    }
}