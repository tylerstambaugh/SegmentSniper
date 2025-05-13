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
            public bool Success { get; set; }
        }
    }
}