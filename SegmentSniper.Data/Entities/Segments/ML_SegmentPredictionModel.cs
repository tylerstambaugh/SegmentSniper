using SegmentSniper.Data.Entities.Auth;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SegmentSniper.Data.Entities.Segments
{
    public class ML_SegmentPredictionModel
    {
        [Key] 
        public string Id { get; set; }
        [ForeignKey("Users")]
        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
        public string SegmentPredictionModelData {  get; set; } 
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime UpdatedDate { get; set; } = DateTime.Now;
    }
}
