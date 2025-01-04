

using SegmentSniper.Data.Entities.Auth;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SegmentSniper.Data.Entities.Equiment
{
    public class Bike
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string BikeId { get; set; }
        [ForeignKey("Users")]
        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
        public bool IsPrimary { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string BrandName { get; set; }
        public string ModelName { get; set; }
        public string FrameType { get; set; }
        public double MetersLogged { get; set; }

        public DateTime DateAdded { get; set; }
        public ICollection<Equipment> Equipment { get; set; } = new List<Equipment>();
    }
}

