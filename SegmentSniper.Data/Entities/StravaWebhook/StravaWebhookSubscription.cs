using SegmentSniper.Data.Entities.Auth;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SegmentSniper.Data.Entities.StravaWebhookSubscription

{
    public class StravaWebhookSubscription
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int StravaWebhookSubscriptionId { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; }



    }
}

