using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SegmentSniper.Data.Entities.Equiment
{
    public class Bike
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public required string BikeId { get; set; }
        public required string AuthUserId { get; set; }
        public bool IsPrimary { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? BrandName { get; set; }
        public string? ModelName { get; set; }
        public int? ModelYear { get; set; }
        public string? FrameType { get; set; }
        public double MetersLogged { get; set; }
        public DateTime DateAdded { get; set; }
        public ICollection<Equipment> Equipment { get; set; } = new List<Equipment>();
        public bool ImportedFromStrava { get; set; }
    }
}

