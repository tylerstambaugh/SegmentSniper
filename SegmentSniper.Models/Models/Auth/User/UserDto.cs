namespace SegmentSniper.Models.Models.Auth.User
{
    public class UserDto
    {

        public UserDto(string id, string firstName, string email, bool hasStravaTokenData)
        {
            Id = id;
            FirstName = firstName;
            Email = email;
            HasStravaTokenData = hasStravaTokenData;
        }
        public string Id { get; }
        public string FirstName { get; }
        public string Email { get; }
        public bool HasStravaTokenData { get; }
    }
}
