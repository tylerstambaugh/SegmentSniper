using SegmentSniper.Data.Entities.Auth;
using SegmentSniper.Data.Entities.StravaToken;

namespace SegmentSniper.Models.Models.ManageProfile
{
    public class UserProfile
    {
        public ApplicationUser ApplicationUser { get; set; }
        public StravaApiToken StravaApiToken { get; set; }
    }
}
