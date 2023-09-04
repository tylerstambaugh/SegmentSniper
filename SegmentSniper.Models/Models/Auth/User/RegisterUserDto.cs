using System.ComponentModel.DataAnnotations;

namespace SegmentSniper.Models.Models.Auth.User
{
    public class RegisterUserDto
    {

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; } = string.Empty;

        [Required(ErrorMessage = "First name is required")]
        public string FirstName { get; set; } = string.Empty;
    }
}
