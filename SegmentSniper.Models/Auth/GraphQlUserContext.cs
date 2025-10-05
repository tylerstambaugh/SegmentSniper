using System.Security.Claims;

namespace SegmentSniper.Models.Auth
{
    public class GraphQLUserContext : Dictionary<string, object?>
    {
        public ClaimsPrincipal? User { get; set; }
    }
}
