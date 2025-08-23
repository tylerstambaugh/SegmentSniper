using SegmentSniper.Data.Entities.User;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SegmentSniper.Data.Entities.Garage
{
    public class Bike
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public required string BikeId { get; set; }

        // Foreign key to AppUser
        public required string AuthUserId { get; set; }
        // Navigation property
        [ForeignKey(nameof(AuthUserId))]

        public virtual AppUser AppUser { get; set; }
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
        public ICollection<BikeActivity> BikeActivities { get; set; } = new List<BikeActivity>();
    }
}

