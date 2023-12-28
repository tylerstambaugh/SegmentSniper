namespace SegmentSniper.Models.Models.Auth.User
{
    public class UserDto
    {

        public UserDto(string id, string firstName, string email, bool hasStravaTokenData, bool verifiedEmail, List<string> roles)
        {
            Id = id;
            FirstName = firstName;
            Email = email;
            HasStravaTokenData = hasStravaTokenData;
            VerifiedEmail = verifiedEmail;
            Roles = roles;
        }

        public UserDto()
        {
            
        }
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string Email { get; set; }
        public bool HasStravaTokenData { get; set; }
        public bool VerifiedEmail { get; set;  }
        public List<string>? Roles { get; set; }
    }
}
