﻿using System.ComponentModel.DataAnnotations;

namespace SegmentSniper.Models.Models.Garage
{
    public class EquipmentModel
    {
        [Key]
        public string Id { get; set; }
        public string BikeId { get; set; }
        public string UserId { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
        public decimal MilesLogged { get; set; }
        public DateTime InstallDate { get; set; }
        public DateTime RetiredDate { get; set; }
        public decimal Price { get; set; }
        public int ReplaceAtMiles { get; set; }
        public int MilesUntilReplaceReminder { get; set; }
    }
}