namespace SegmentSniper.Models.Models.Auth.User
{
    public class UserDto
    {

        public UserDto(string id, string firstName, string email)
        {
            Id = id;
            FirstName = firstName;
            Email = email;
        }
        public string Id { get; }
        public string FirstName { get; }
        public string Email { get; }
    }
}
