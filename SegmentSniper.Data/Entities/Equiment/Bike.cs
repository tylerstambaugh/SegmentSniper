

using System.ComponentModel.DataAnnotations;

namespace SegmentSniper.Data.Entities.Equiment
{
    public class Bike
    {
        [Key]
        public string BikeId { get; set; }
        public bool IsPrimary { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string BrandName { get; set; }
        public string ModelName { get; set; }
        public string FrameType { get; set; }
        public decimal DistanceLogged { get; set; }
    }
}

