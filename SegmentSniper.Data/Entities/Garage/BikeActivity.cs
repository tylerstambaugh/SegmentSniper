using SegmentSniper.Data.Entities.User;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SegmentSniper.Data.Entities.Garage
{
    public class BikeActivity : BaseEntity
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid BikeActivityId { get; set; }

        
        public required string AuthUserId { get; set; }        
        [ForeignKey(nameof(AuthUserId))]
        public virtual AppUser AppUser { get; set; }

        public required string BikeId { get; set; }
        [ForeignKey(nameof(BikeId))]
        public virtual Bike Bike { get; set; }

        [Required]
        public string StravaActivityId { get; set; }
        [Required]
        public DateTime ActivityDate { get; set; }
        [Required]
        public double DistanceInMeters { get; set; }
    }
}
