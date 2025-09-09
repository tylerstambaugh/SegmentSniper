namespace SegmentSniper.Models.Garage
{
    public class BikeModel
    {
        public string? BikeId { get; set; }
        public string UserId { get; set; }
        public bool IsPrimary { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? BrandName { get; set; }
        public string? ModelName { get; set; }
        public FrameType? FrameType { get; set; }
        public double? MetersLogged { get; set; }
        public List<EquipmentModel> Equipment { get; set; } = new List<EquipmentModel>();
        public bool ImportedFromStrava { get; set; }
    }

    public enum FrameType
    {
        None,
        MTB = 1,
        Cross = 2,
        Road = 3,
        TimeTrial = 4,
        Gravel = 5,
        Ebike = 6,
        Other = 7
    }
}
