using SegmentSniper.Data.Entities.Auth;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SegmentSniper.Data.Entities.Segments
{
    public class ML_SegmentEffort
    {
        [Key]
        public int SegmentEffortId { get; set; }
        [ForeignKey("Users")]
        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
        public string StravaSegmentEffortId { get; set; }
        public string StravaSegmentId { get; set; }
        public string SegmentName { get; set; }
        public int ElapsedTime { get; set; }
        public int SegmentPrTime { get; set; }        
        public double Distance { get; set; }
        public double? AverageSpeed { get; set; }
        public double? MaximumSpeed { get; set; }
        public double? ElevationGain { get; set; }
        public double? AverageGrade { get; set; }
        public double? MaximumGrade { get; set; }
        public double? AverageHeartRate { get; set; }
        public int? KomTime { get; set; }
        public int? QomTime { get; set; }
        public int? AthleteCount { get; set; }
        public int? EffortCount { get; set; }
        public int? StarCount { get; set; }
        public int? PrRank { get; set; }
        public int? Rank { get; set; }
    }
}
