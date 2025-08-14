

using SegmentSniper.Data.Entities.Auth;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SegmentSniper.Data.Entities.Equiment
{
    public class Equipment
    {
        [Key]
        public string EquipmentId { get; set; }
        [ForeignKey("Bike")]
        public string BikeId { get; set; }
        public virtual Bike Bike { get; set; }        
        public string AuthUserId { get; set; }        
        public required string Name { get; set; }
        public string? Description { get; set; }
        public decimal MilesLogged { get; set; }
        public DateTime? InstallDate { get; set; }
        public DateTime? RetiredDate { get; set; }
        public decimal Price { get; set; }
        public int ReplaceAtMiles { get; set; }
        public int MilesUntilReplaceReminder { get; set; }
    }
}
