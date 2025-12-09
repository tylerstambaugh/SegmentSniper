using System.ComponentModel.DataAnnotations;

namespace SegmentSniper.Models.Garage
{
    public class EquipmentModel
    {
        [Key]
        public string? EquipmentId { get; set; }
        public required string BikeId { get; set; }
        public required string UserId { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
        public decimal MilesAtInstall { get; set; }
        public decimal TotalMiles { get; set; }
        public DateTime? InstallDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public DateTime? RetiredDate { get; set; }
        public DateTime? ReminderDate { get; set; }
        public int ReminderDurationInMonths { get; set; }
        public decimal Price { get; set; }
        public int ReplaceAtMiles { get; set; }
        public int MilesUntilReplaceReminder { get; set; }

        public int MaxRemindersToSend { get; set; }
        public int RemindersSent { get; set; }
    }
}
