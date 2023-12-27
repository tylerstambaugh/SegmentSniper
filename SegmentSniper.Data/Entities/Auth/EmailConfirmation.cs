using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SegmentSniper.Data.Entities.Auth
{
    public class EmailConfirmation
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Users")]
        public string UserId { get; set; }
        public Guid ConfirmationCode { get; set; }
        public DateTime Expiration {  get; set; }
    }
}
