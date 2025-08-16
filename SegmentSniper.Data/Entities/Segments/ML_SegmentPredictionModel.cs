
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SegmentSniper.Data.Entities.Segments
{
    public class ML_SegmentPredictionModel
    {
        [Key] 
        public string Id { get; set; }
        public string AuthUserId { get; set; }
        
        public byte[] SegmentPredictionModelData {  get; set; } 
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
