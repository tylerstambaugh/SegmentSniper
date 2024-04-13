using SegmentSniper.Data.Entities.Auth;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SegmentSniper.Data.Entities.ManageProfile
{
    public class ChangeEmailVerificationCode
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("Users")]
        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
        public int VerificationCode { get; set; }
        public DateTime ExpirationDate { get; set; }
    }
}
