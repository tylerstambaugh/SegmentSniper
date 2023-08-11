namespace SegmentSniper.Api.Models.User
{
    public class User
    {

        public User(string id, string firstName, string email)
        {
            Id = id;
            FirstName = firstName;
            Email = email;
        }
        public string Id { get; }
        public  string FirstName { get; }
        public string Email { get; }
    }
}
