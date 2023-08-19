namespace SegmentSniper.Models.Models.Auth.User
{
    public class UserDto
    {

        public UserDto(string id, string username, string firstName, string email)
        {
            Id = id;
            Username = username;
            FirstName = firstName;
            Email = email;
        }
        public string Id { get; }
        public string Username { get; }
        public string FirstName { get; }
        public string Email { get; }
    }
}
