using System.ComponentModel.DataAnnotations;

namespace SegmentSniper.Models.Models.Auth.User
{
    public class UserLogin
    {
        [Required(ErrorMessage = "Username is required")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }
}
