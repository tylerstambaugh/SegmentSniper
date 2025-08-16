using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SegmentSniper.Data.Entities.Equiment
{
    public class BikeActivity
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid BikeActivityId { get; set; }
        public string AuthUserId { get; set; }

        [Required]
        [ForeignKey("Bikes")]
        public string BikeId { get; set; }
        public virtual Bike Bike { get; set; }
        [Required]
        public string StravaActivityId { get; set; }
        [Required]
        public DateTime ActivityDate { get; set; }
        [Required]
        public double DistanceInMeters { get; set; }
    }
}
