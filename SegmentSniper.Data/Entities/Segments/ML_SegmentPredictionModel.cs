
using SegmentSniper.Data.Entities.User;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SegmentSniper.Data.Entities.Segments
{
    public class ML_SegmentPredictionModel : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }

        // Foreign key to AppUser
        public required string AuthUserId { get; set; }
        // Navigation property
        [ForeignKey(nameof(AuthUserId))]
        public virtual AppUser AppUser { get; set; }

        public byte[] SegmentPredictionModelData {  get; set; } 
    }
}
