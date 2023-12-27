namespace SegmentSniper.Services.AuthServices
{
    public interface IConfirmEmail
    {
        public void Execute(ConfirmEmailContract contract);
    }

    public class ConfirmEmailContract
    {
        public ConfirmEmailContract(string userId, string email, string confirmationToken)
        {
            UserId = userId;
            Email = email;
            ConfirmationToken = confirmationToken;
        }

        public string UserId { get; set; }
        public string Email { get; set; }
        public string ConfirmationToken { get; set; }
    }
}