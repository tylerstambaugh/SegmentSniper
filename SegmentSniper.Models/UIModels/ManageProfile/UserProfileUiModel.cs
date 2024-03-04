namespace SegmentSniper.Models.UIModels.ManageProfile
{
    public class UserProfileUiModel
    {
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public bool HasStravaToken { get; set; }
        public DateTime? StravaTokenExpiresAt { get; set; }
        public DateTime LastLogin { get; set; }
    }
}
