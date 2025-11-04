using SegmentSniper.Data.Entities.User;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SegmentSniper.Data.Entities.Garage
{
    public class Equipment
    {
        [Key]
        public string EquipmentId { get; set; }

        public required string BikeId { get; set; }

        [ForeignKey(nameof(BikeId))]
        public virtual Bike Bike { get; set; }

        // Foreign key to AppUser
        public required string AuthUserId { get; set; }
        // Navigation property
        [ForeignKey(nameof(AuthUserId))]
        public virtual AppUser AppUser { get; set; }

        public required string Name { get; set; }
        public string? Description { get; set; }
        public decimal MilesAtInstall { get; set; }
        public decimal TotalMilage { get; set; }
        public DateTime? InstallDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public DateTime? RetiredDate { get; set; }
        public DateTime? ReminderDate { get; set; }        
        public TimeSpan? ReminderDuration { get; set; }
        public decimal Price { get; set; }
        public int ReplaceAtMiles { get; set; }
        public int MilesUntilReplaceReminder { get; set; }

        public int MaxRemindersToSend { get; set; }
        public int RemindersSent { get; set; }
    }
}
